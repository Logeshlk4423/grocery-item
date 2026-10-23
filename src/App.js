
import { useMemo, useState } from 'react';
import {
    Alert,
    Image,
    ImageBackground,
    Linking,
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';

const C = {
  green: '#174D35',
  green2: '#246747',
  mint: '#E7F1E8',
  cream: '#FBF8F0',
  white: '#FFFFFF',
  ink: '#202A22',
  muted: '#7A837B',
  line: '#E9E7DE',
  yellow: '#F6C84A',
  orange: '#E58B3A',
};

const PRODUCTS = [
  {
    id: '1',
    name: 'Naattu Thakkali',
    english: 'Country Tomato',
    price: 32,
    unit: '500 g',
    category: 'Vegetables',
    badge: 'Farm fresh',
    image: 'https://images.unsplash.com/photo-1546094096-0df4bcaaa337?w=600&auto=format&fit=crop&q=85',
    description: 'Nalla pazhutha naattu thakkali. Sambar, rasam, chutney ellathukkum fresh-ah use pannunga.',
  },
  {
    id: '2',
    name: 'Ooty Urulaikilangu',
    english: 'Ooty Potato',
    price: 38,
    unit: '1 kg',
    category: 'Vegetables',
    badge: 'Popular',
    image: 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=600&auto=format&fit=crop&q=85',
    description: 'Malai valarndha Ooty urulaikilangu. Roast, poriyal, masala curry-ku super choice.',
  },
  {
    id: '3',
    name: 'Poovan Vazhappazham',
    english: 'Banana',
    price: 45,
    unit: '6 pcs',
    category: 'Fruits',
    badge: 'Local pick',
    image: 'https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=600&auto=format&fit=crop&q=85',
    description: 'Inippana Poovan pazham; kaalai tiffin-ukkum, evening snack-ukkum etha local pick.',
  },
  {
    id: '4',
    name: 'Ponni Arisi',
    english: 'Ponni Rice',
    price: 265,
    unit: '5 kg',
    category: 'Rice & Dal',
    badge: 'Daily essential',
    image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=600&auto=format&fit=crop&q=85',
    description: 'Daily saapattukku soft-ah, manamaaga varum Ponni arisi. Namma veettu samayalukku nambikkaiyana staple.',
  },
  {
    id: '5',
    name: 'Thuvaram Paruppu',
    english: 'Toor Dal',
    price: 78,
    unit: '500 g',
    category: 'Rice & Dal',
    badge: 'Kitchen staple',
    image: 'https://images.unsplash.com/photo-1609501676725-7186f017a4b7?w=600&auto=format&fit=crop&q=85',
    description: 'Protein niraintha thuvaram paruppu. Sambar, paruppu kadaiyal, rasam-ku sariyana choice.',
  },
  {
    id: '6',
    name: 'Aavin Paal',
    english: 'Fresh Milk',
    price: 34,
    unit: '500 ml',
    category: 'Dairy',
    badge: 'Fresh daily',
    image: 'https://images.unsplash.com/photo-1563636619-e9143da7973b?w=600&auto=format&fit=crop&q=85',
    description: 'Daily use-kku fresh paal. Tea, coffee, payasam matrum kaalai breakfast-kku porutham.',
  },
  {
    id: '7',
    name: 'Naatu Sakkarai',
    english: 'Country Jaggery',
    price: 58,
    unit: '500 g',
    category: 'Masala',
    badge: 'Traditional',
    localImage: require('../assets/images/products/naatu-sakkarai.jpg'),
    image: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/a/a5/%281%29_Jaggery_Gud_Punjab_India.jpg/960px-%281%29_Jaggery_Gud_Punjab_India.jpg',
    imageCredit: 'Giridhar Appaji Nag Y · CC BY 2.0',
    imageSource: 'https://commons.wikimedia.org/wiki/File:%281%29_Jaggery_Gud_Punjab_India.jpg',
    description: 'Karumbu suvaiyil naatu sakkarai. Coffee, sukku kaapi, pongal matrum sweets-la serkkalam.',
  },
  {
    id: '8',
    name: 'Manjal Thool',
    english: 'Turmeric Powder',
    price: 42,
    unit: '100 g',
    category: 'Masala',
    badge: 'Homestyle',
    localImage: require('../assets/images/products/manjal-thool.jpg'),
    image: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/a/a5/Grounded_turmeric.jpg/960px-Grounded_turmeric.jpg',
    imageCredit: 'Barbara-Ingeborg · CC BY-SA 4.0',
    imageSource: 'https://commons.wikimedia.org/wiki/File:Grounded_turmeric.jpg',
    description: 'Nalla niramum manamum konda manjal thool. Daily kuzhambu, poriyal samayalukku konjam podhum.',
  },
  {
    id: '9',
    name: 'Thengai',
    english: 'Fresh Coconut',
    price: 36,
    unit: '1 pc',
    category: 'Vegetables',
    badge: 'Fresh today',
    image: 'https://images.unsplash.com/photo-1518843875459-f738682238a6?w=600&auto=format&fit=crop&q=85',
    description: 'Thanni niraintha fresh thengai. Chutney, thengai paal, poriyal matrum sweets-ku use pannunga.',
  },
  {
    id: '10',
    name: 'Seeraga Samba',
    english: 'Jeera Samba Rice',
    price: 115,
    unit: '1 kg',
    category: 'Rice & Dal',
    badge: 'Special rice',
    image: 'https://images.unsplash.com/photo-1516684732162-798a0062be99?w=600&auto=format&fit=crop&q=85',
    description: 'Manamaana Seeraga Samba arisi; biryani, kuska matrum special weekend lunch-ku arumai.',
  },
  {
    id: '11',
    name: 'Thayir',
    english: 'Fresh Curd',
    price: 30,
    unit: '500 g',
    category: 'Dairy',
    badge: 'Homestyle',
    image: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?w=600&auto=format&fit=crop&q=85',
    description: 'Creamy fresh thayir. Thayir saadham, mor kuzhambu, pachadi ellathukkum veettu suvai.',
  },
  {
    id: '12',
    name: 'Murukku',
    english: 'Traditional Snack',
    price: 55,
    unit: '200 g',
    category: 'Snacks',
    badge: 'Tea-time pick',
    localImage: require('../assets/images/products/murukku.jpg'),
    image: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/9/9b/Traditional_Murukku%2C_a_must_have_for_festivals_such_as_Deepavali.jpg/960px-Traditional_Murukku%2C_a_must_have_for_festivals_such_as_Deepavali.jpg',
    imageCredit: 'Shanmuga Priya Streethran · CC BY-SA 4.0',
    imageSource: 'https://commons.wikimedia.org/wiki/File:Traditional_Murukku,_a_must_have_for_festivals_such_as_Deepavali.jpg',
    description: 'Murukku maavu matrum masala kalandhu seitha moru-moru snack. Tea time-ku Namma Ooru favourite.',
  },
  {
    id: '13',
    name: 'Periya Vengayam',
    english: 'Red Onion',
    price: 42,
    unit: '1 kg',
    category: 'Vegetables',
    badge: 'Daily fresh',
    image: 'https://images.unsplash.com/photo-1508747703725-719777637510?w=600&auto=format&fit=crop&q=85',
    description: 'Daily samayalukku thevaiyana fresh vengayam. Sambar, biryani, vadagam ellathukkum use aagum.',
  },
  {
    id: '14',
    name: 'Ooty Carrot',
    english: 'Fresh Carrot',
    price: 48,
    unit: '500 g',
    category: 'Vegetables',
    badge: 'Crunchy pick',
    image: 'https://images.unsplash.com/photo-1445282768818-728615cc910a?w=600&auto=format&fit=crop&q=85',
    description: 'Crunchy-ah irukkum Ooty carrot. Salad, poriyal, soup matrum halwa seiyya nalla choice.',
  },
  {
    id: '15',
    name: 'Pachai Milagai',
    english: 'Green Chilli',
    price: 18,
    unit: '100 g',
    category: 'Vegetables',
    badge: 'Local farm',
    image: 'https://images.unsplash.com/photo-1588252303782-cb80119abd6d?w=600&auto=format&fit=crop&q=85',
    description: 'Fresh pachai milagai; chutney, kurma, thokku-ku thevaiyana kaaramum manamum kodukkum.',
  },
  {
    id: '16',
    name: 'Alphonso Maambazham',
    english: 'Sweet Mango',
    price: 120,
    unit: '2 pcs',
    category: 'Fruits',
    badge: 'Seasonal',
    image: 'https://images.unsplash.com/photo-1553279768-865429fa0078?w=600&auto=format&fit=crop&q=85',
    description: 'Season-la kidaikkum inippana maambazham. Appadiye saappidavum juice seiyyavum super.',
  },
  {
    id: '17',
    name: 'Nagpur Orange',
    english: 'Sweet Orange',
    price: 65,
    unit: '4 pcs',
    category: 'Fruits',
    badge: 'Juicy',
    image: 'https://images.unsplash.com/photo-1547514701-42782101795e?w=600&auto=format&fit=crop&q=85',
    description: 'Juicy-ah, vitamin C niraintha orange. Fresh fruit snack matrum juice-kku etrathu.',
  },
  {
    id: '18',
    name: 'Paasi Paruppu',
    english: 'Moong Dal',
    price: 72,
    unit: '500 g',
    category: 'Rice & Dal',
    badge: 'Protein rich',
    image: 'https://images.unsplash.com/photo-1584270354949-c26b0d5b4a0c?w=600&auto=format&fit=crop&q=85',
    description: 'Seekiram vendhuvidum paasi paruppu. Payasam, pongal, kootu matrum healthy lunch-kku nallathu.',
  },
  {
    id: '19',
    name: 'Kondakadalai',
    english: 'Brown Chickpeas',
    price: 68,
    unit: '500 g',
    category: 'Rice & Dal',
    badge: 'Nattu staple',
    image: 'https://images.unsplash.com/photo-1605000797499-95a51c5269ae?w=600&auto=format&fit=crop&q=85',
    description: 'Naarcchathu niraintha kondakadalai. Sundal, kuzhambu matrum saathu maavukku use pannunga.',
  },
  {
    id: '20',
    name: 'Paneer',
    english: 'Fresh Cottage Cheese',
    price: 95,
    unit: '200 g',
    category: 'Dairy',
    badge: 'Soft & fresh',
    image: 'https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=600&auto=format&fit=crop&q=85',
    description: 'Soft-ah irukkum paneer cubes. Paneer butter masala, pepper fry matrum roll seiyya super.',
  },
  {
    id: '21',
    name: 'Vennai',
    english: 'Fresh Butter',
    price: 58,
    unit: '100 g',
    category: 'Dairy',
    badge: 'Creamy',
    image: 'https://images.unsplash.com/photo-1589985270826-4b7bb135bc9d?w=600&auto=format&fit=crop&q=85',
    description: 'Creamy vennai; dosai, bread, baking matrum veettu snacks-ku suvai serkkum.',
  },
  {
    id: '22',
    name: 'Milagai Thool',
    english: 'Chilli Powder',
    price: 38,
    unit: '100 g',
    category: 'Masala',
    badge: 'Kaaram & manam',
    localImage: require('../assets/images/products/milagai-thool.jpg'),
    image: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/2/23/Red_chilli_powder.jpg/960px-Red_chilli_powder.jpg',
    imageCredit: 'Maa chamunda devi enterprises pvt.ltd. · CC BY-SA 4.0',
    imageSource: 'https://commons.wikimedia.org/wiki/File:Red_chilli_powder.jpg',
    description: 'Sivappu milagai araithu seitha thool. Kuzhambu, roast matrum masala dishes-ku nalla kaaram.',
  },
  {
    id: '23',
    name: 'Mallithool',
    english: 'Coriander Powder',
    price: 32,
    unit: '100 g',
    category: 'Masala',
    badge: 'Freshly ground',
    localImage: require('../assets/images/products/mallithool.jpg'),
    image: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/6/64/Coriander_powder.JPG/960px-Coriander_powder.JPG',
    imageCredit: 'Nithyasrm · CC BY-SA 4.0',
    imageSource: 'https://commons.wikimedia.org/wiki/File:Coriander_powder.JPG',
    description: 'Manamaana mallithool; kuzhambu, kurma matrum gravy-kku Namma veettu touch kodukkum.',
  },
  {
    id: '24',
    name: 'Nendran Vazhaipazha Chips',
    english: 'Banana Chips',
    price: 60,
    unit: '200 g',
    category: 'Snacks',
    badge: 'Tea-time pick',
    localImage: require('../assets/images/products/nendran-vazhaipazha-chips.jpg'),
    image: 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=600&auto=format&fit=crop&q=85',
    imageCredit: 'Ravi Dwivedi · CC BY-SA 4.0',
    imageSource: 'https://commons.wikimedia.org/wiki/File:Banana_Chips_in_Palakkad.jpg',
    description: 'Nendran vazhaipazham-la seitha moru-moru chips. Tea, coffee kooda saappidavum share pannavum nalla Kerala snack.',
  },
  {
    id: '25',
    name: 'Kadalai Mittai',
    english: 'Peanut Jaggery Candy',
    price: 45,
    unit: '150 g',
    category: 'Snacks',
    badge: 'Traditional',
    localImage: require('../assets/images/products/kadalai-mittai.jpg'),
    image: 'https://images.unsplash.com/photo-1581798459219-318e76aecc7b?w=600&auto=format&fit=crop&q=85',
    imageCredit: 'Tamizhmuhil · CC BY-SA 4.0',
    imageSource: 'https://commons.wikimedia.org/wiki/File:Groundnut_chikki.JPG',
    description: 'Verkadalaiyum naatu sakkaraiyum sertha traditional mittai. Chinna pasangalukkum periyavangalukkum pidikkum.',
  },
  {
    id: '26',
    name: 'Nallennai',
    english: 'Gingelly Oil',
    price: 145,
    unit: '500 ml',
    category: 'Oils',
    badge: 'Traditional',
    image: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=600&auto=format&fit=crop&q=85',
    description: 'Ellil irundhu edukkappatta nallennai. Pickle, podi saadham matrum traditional samayalukku manam serkkum.',
  },
  {
    id: '27',
    name: 'Thengai Ennai',
    english: 'Coconut Oil',
    price: 125,
    unit: '500 ml',
    category: 'Oils',
    badge: 'Everyday use',
    image: 'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=600&auto=format&fit=crop&q=85',
    description: 'Daily samayal matrum veettu use-kku coconut oil. Nalla manamum palavidha use-um konda staple.',
  },
];

const CATEGORIES = [
  { id: 'All', label: 'All items', icon: '🛍️' },
  { id: 'Vegetables', label: 'Kaai-kari', icon: '🥬' },
  { id: 'Fruits', label: 'Pazhangal', icon: '🍌' },
  { id: 'Rice & Dal', label: 'Arisi & Dal', icon: '🌾' },
  { id: 'Dairy', label: 'Paal & Thayir', icon: '🥛' },
  { id: 'Masala', label: 'Masala', icon: '🌶️' },
  { id: 'Snacks', label: 'Snacks', icon: '🥨' },
  { id: 'Oils', label: 'Ennai', icon: '🫒' },
];

const money = (n) => `₹${n}`;

export default function App() {
  const [tab, setTab] = useState('Home');
  const [category, setCategory] = useState('All');
  const [search, setSearch] = useState('');
  const [cart, setCart] = useState({});
  const [favorites, setFavorites] = useState([]);
  const [selected, setSelected] = useState(null);
  const [showAll, setShowAll] = useState(false);
  const [account, setAccount] = useState(null);
  const [accountPage, setAccountPage] = useState('login');
  const [authName, setAuthName] = useState('');
  const [authEmail, setAuthEmail] = useState('');
  const [authPassword, setAuthPassword] = useState('');
  const [authError, setAuthError] = useState('');
  const [profileNameInput, setProfileNameInput] = useState('');
  const [profileEmailInput, setProfileEmailInput] = useState('');
  const [profileError, setProfileError] = useState('');
  const [savedAddresses, setSavedAddresses] = useState([]);
  const [editingAddressIndex, setEditingAddressIndex] = useState(null);
  const [addressLabelInput, setAddressLabelInput] = useState('');
  const [addressLineInput, setAddressLineInput] = useState('');
  const [addressLandmarkInput, setAddressLandmarkInput] = useState('');
  const [addressPincodeInput, setAddressPincodeInput] = useState('');
  const [addressError, setAddressError] = useState('');
  const [activeOffer, setActiveOffer] = useState(false);
  const [rewardPoints, setRewardPoints] = useState(0);
  const [expandedHelpTopic, setExpandedHelpTopic] = useState(null);
  const [supportMessage, setSupportMessage] = useState('');
  const [supportMessageSaved, setSupportMessageSaved] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('Cash on delivery');
  const [order, setOrder] = useState(null);
  const [orderStage, setOrderStage] = useState(0);

  const cartCount = Object.values(cart).reduce(
    (sum, qty) => sum + qty,
    0
  );

  const cartTotal = PRODUCTS.reduce(
    (sum, product) =>
      sum + product.price * (cart[product.id] || 0),
    0
  );
  const offerDiscount = activeOffer ? Math.round(cartTotal * 0.1) : 0;
  const deliveryFee = cartTotal === 0 || cartTotal >= 299 ? 0 : 25;
  const payableTotal = Math.max(cartTotal - offerDiscount, 0) + deliveryFee;

  const products = useMemo(() => {
    let list = PRODUCTS.filter((p) => {
      const matchesCategory =
        category === 'All' || p.category === category;

      const term = search.trim().toLowerCase();

      const matchesSearch =
        !term ||
        `${p.name} ${p.english} ${p.category} ${p.description}`
          .toLowerCase()
          .includes(term);

      return matchesCategory && matchesSearch;
    });

    if (tab === 'Favorites') {
      list = list.filter((p) => favorites.includes(p.id));
    }

    if (tab === 'Cart') {
      list = list.filter((p) => (cart[p.id] || 0) > 0);
    }

    if (
      tab === 'Home' &&
      !showAll &&
      category === 'All' &&
      !search
    ) {
      list = list.slice(0, 6);
    }

    return list;
  }, [
    category,
    search,
    tab,
    favorites,
    cart,
    showAll,
  ]);

  function changeQuantity(id, amount) {
    setCart((previous) => {
      const next = Math.max(
        0,
        (previous[id] || 0) + amount
      );

      const updated = { ...previous };

      if (next === 0) {
        delete updated[id];
      } else {
        updated[id] = next;
      }

      return updated;
    });
  }

  function toggleFavorite(id) {
    setFavorites((previous) =>
      previous.includes(id)
        ? previous.filter((item) => item !== id)
        : [...previous, id]
    );
  }

  function navigate(nextTab) {
    setSelected(null);
    setTab(nextTab);
    setCategory('All');
    setSearch('');
    setShowAll(nextTab !== 'Home');
  }

  function chooseCategory(id) {
    setCategory(id);
    setTab('Home');
    setShowAll(true);
  }

  function openAccountPage(page) {
    setAuthError('');
    setProfileError('');
    setAddressError('');
    setAccountPage(page);
  }

  function openProfileEditor() {
    setProfileNameInput(account?.name || '');
    setProfileEmailInput(account?.email || '');
    setProfileError('');
    openAccountPage('editProfile');
  }

  function saveProfile() {
    const email = profileEmailInput.trim().toLowerCase();

    if (!profileNameInput.trim()) {
      setProfileError('Ungal peyarai enter pannunga.');
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setProfileError('Valid Gmail address enter pannunga.');
      return;
    }

    setAccount((previous) => previous
      ? { ...previous, name: profileNameInput.trim(), email }
      : previous);
    setProfileError('');
    setAccountPage('account');
  }

  function startAddressForm(index = null) {
    const address = index === null ? null : savedAddresses[index];
    setEditingAddressIndex(index);
    setAddressLabelInput(address?.label || 'Home');
    setAddressLineInput(address?.line || '');
    setAddressLandmarkInput(address?.landmark || '');
    setAddressPincodeInput(address?.pincode || '');
    setAddressError('');
    setAccountPage('addressForm');
  }

  function saveAddress() {
    const pincode = addressPincodeInput.replace(/\D/g, '');
    if (!addressLabelInput.trim() || !addressLineInput.trim()) {
      setAddressError('Address label and full address enter pannunga.');
      return;
    }
    if (!/^\d{6}$/.test(pincode)) {
      setAddressError('Valid 6 digit pincode enter pannunga.');
      return;
    }

    const nextAddress = {
      label: addressLabelInput.trim(),
      line: addressLineInput.trim(),
      landmark: addressLandmarkInput.trim(),
      pincode,
      isDefault: editingAddressIndex === null
        ? savedAddresses.length === 0
        : savedAddresses[editingAddressIndex]?.isDefault || false,
    };

    setSavedAddresses((previous) => {
      if (editingAddressIndex === null) return [...previous, nextAddress];
      return previous.map((address, index) =>
        index === editingAddressIndex ? nextAddress : address
      );
    });
    setAddressError('');
    setAccountPage('addresses');
  }

  function setDefaultAddress(index) {
    setSavedAddresses((previous) => previous.map((address, itemIndex) => ({
      ...address,
      isDefault: itemIndex === index,
    })));
  }

  function deleteAddress(index) {
    setSavedAddresses((previous) => {
      const remaining = previous.filter((_, itemIndex) => itemIndex !== index);
      if (previous[index]?.isDefault && remaining.length > 0) {
        remaining[0] = { ...remaining[0], isDefault: true };
      }
      return remaining;
    });
  }

  function submitAccountForm() {
    const email = authEmail.trim().toLowerCase();

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setAuthError('Valid Gmail address enter pannunga.');
      return;
    }

    if (!authPassword) {
      setAuthError('Password enter pannunga.');
      return;
    }

    if (accountPage === 'register' && !authName.trim()) {
      setAuthError('Ungal peyarai enter pannunga.');
      return;
    }

    setAccount({
      name: accountPage === 'register'
        ? authName.trim()
        : account?.email === email
          ? account.name
          : email.split('@')[0],
      email,
    });
    setAuthEmail(email);
    setAuthPassword('');
    setAuthName('');
    setAuthError('');
    setAccountPage('account');
    setTab('Home');
    setCategory('All');
    setSearch('');
    setShowAll(false);
  }

  function signOut() {
    setAccount(null);
    setAuthName('');
    setAuthEmail('');
    setAuthPassword('');
    setAuthError('');
    setAccountPage('login');
    setTab('Home');
    setCategory('All');
    setSearch('');
    setShowAll(false);
  }

  function placeDemoOrder() {
    const items = PRODUCTS
      .filter((product) => cart[product.id] > 0)
      .map((product) => ({
        id: product.id,
        name: product.name,
        quantity: cart[product.id],
        unit: product.unit,
        price: product.price,
      }));

    if (items.length === 0) return;

    setOrder({
      id: `NM${Date.now().toString().slice(-6)}`,
      items,
      total: payableTotal,
      discount: offerDiscount,
      offerApplied: activeOffer,
      paymentMethod,
      paymentStatus: paymentMethod === 'Cash on delivery'
        ? 'Payment due on delivery'
        : 'Demo payment completed',
    });
    setOrderStage(0);
    setRewardPoints((points) => points + Math.floor(payableTotal));
    setCart({});
    setActiveOffer(false);
    setTab('Tracking');
    setCategory('All');
    setSearch('');
    setShowAll(true);
  }

  function ProductCard({ product }) {
    const quantity = cart[product.id] || 0;
    const favorite = favorites.includes(product.id);

    return (
      <View style={styles.productCard}>
        <TouchableOpacity
          activeOpacity={0.9}
          onPress={() => setSelected(product)}
          style={styles.productImageWrap}
        >
          <Image
            source={product.localImage || { uri: product.image }}
            style={styles.productImage}
            resizeMode="cover"
          />

          <View style={styles.badge}>
            <Text style={styles.badgeText}>
              {product.badge}
            </Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.heart}
          onPress={() => toggleFavorite(product.id)}
        >
          <Text style={{ fontSize: 18 }}>
            {favorite ? '❤️' : '♡'}
          </Text>
        </TouchableOpacity>

        <View style={styles.productInfo}>
          <Text style={styles.productName} numberOfLines={1}>
            {product.name}
          </Text>

          <Text style={styles.productEnglish} numberOfLines={1}>
            {product.english}
          </Text>

          <TouchableOpacity
            onPress={() => setSelected(product)}
            style={styles.productDetailsLink}
          >
            <Text style={styles.productDetailsText}>View details →</Text>
          </TouchableOpacity>

          <View style={styles.priceRow}>
            <View>
              <Text style={styles.price}>
                {money(product.price)}
              </Text>
              <Text style={styles.unit}>
                per {product.unit}
              </Text>
            </View>

            {quantity > 0 ? (
              <View style={styles.quantityControl}>
                <TouchableOpacity
                  onPress={() => changeQuantity(product.id, -1)}
                  style={styles.qtyButton}
                >
                  <Text style={styles.qtySymbol}>−</Text>
                </TouchableOpacity>

                <Text style={styles.qtyNumber}>{quantity}</Text>

                <TouchableOpacity
                  onPress={() => changeQuantity(product.id, 1)}
                  style={styles.qtyButton}
                >
                  <Text style={styles.qtySymbol}>+</Text>
                </TouchableOpacity>
              </View>
            ) : (
              <TouchableOpacity
                style={styles.addButton}
                onPress={() => changeQuantity(product.id, 1)}
              >
                <Text style={styles.addButtonText}>＋ Add</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </View>
    );
  }

  function SectionTitle({ title, subtitle, action, onAction }) {
    return (
      <View style={styles.sectionHeading}>
        <View style={{ flex: 1 }}>
          <Text style={styles.sectionTitle}>{title}</Text>
          <Text style={styles.sectionSubtitle}>{subtitle}</Text>
        </View>

        {!!action && (
          <TouchableOpacity onPress={onAction}>
            <Text style={styles.viewAll}>{action} ↗</Text>
          </TouchableOpacity>
        )}
      </View>
    );
  }

  function ProductGrid({ items }) {
    return (
      <View style={styles.productGrid}>
        {items.map((product) => (
          <View key={product.id} style={styles.gridCell}>
            <ProductCard product={product} />
          </View>
        ))}
      </View>
    );
  }

  function Header() {
    return (
      <View style={styles.header}>
        <View style={styles.brandRow}>
          <View style={styles.logo}>
            <Text style={{ fontSize: 24 }}>🌿</Text>
          </View>

          <View>
            <Text style={styles.brandName}>
              Namma <Text style={{ color: C.yellow }}>Market</Text>
            </Text>
            <Text style={styles.brandTag}>
              உங்க ஊரு • உங்க மளிகை
            </Text>
          </View>
        </View>

        <TouchableOpacity
          style={styles.locationChip}
          onPress={() =>
            Alert.alert(
              'Delivery location',
              'Coimbatore, Tamil Nadu'
            )
          }
        >
          <Text style={{ fontSize: 20, color: C.yellow }}>
            ⌖
          </Text>
          <View style={{ marginLeft: 5 }}>
            <Text style={styles.locationSmall}>DELIVER TO</Text>
            <Text style={styles.locationCity}>Coimbatore⌄</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  }

  function SearchBar() {
    return (
      <View style={styles.searchWrap}>
        <Text style={styles.searchIcon}>⌕</Text>

        <TextInput
          value={search}
          onChangeText={setSearch}
          placeholder="Search arisi, paruppu, kaai-kari..."
          placeholderTextColor="#929A92"
          style={styles.searchInput}
          returnKeyType="search"
        />

        {!!search && (
          <TouchableOpacity onPress={() => setSearch('')}>
            <Text style={{ color: C.muted, padding: 7 }}>✕</Text>
          </TouchableOpacity>
        )}
      </View>
    );
  }

  function Hero() {
    return (
      <ImageBackground
        source={{
          uri: 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=1200&auto=format&fit=crop&q=90',
        }}
        style={styles.hero}
        imageStyle={styles.heroImage}
      >
        <View style={styles.heroShade} />

        <View style={styles.heroContent}>
          <Text style={styles.heroEyebrow}>
            🌱 FROM LOCAL FARMS
          </Text>

          <Text style={styles.heroTitle}>
            Fresh ah irukku.{'\\n'}Namma ooru style-la!
          </Text>

          <Text style={styles.heroSubtitle}>
            Daily essentials, fresh kaai-kari and
            traditional kitchen staples — all in one basket.
          </Text>

          <TouchableOpacity
            style={styles.heroButton}
            onPress={() => setShowAll(true)}
          >
            <Text style={styles.heroButtonText}>
              Shop groceries →
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.offerCircle}>
          <Text style={styles.offerSmall}>FIRST ORDER</Text>
          <Text style={styles.offerBig}>10% OFF</Text>
          <Text style={styles.offerSmall}>NAMMA10</Text>
        </View>
      </ImageBackground>
    );
  }

  function Categories() {
    return (
      <View style={styles.section}>
        <SectionTitle
          title="Shop by category"
          subtitle="Ungal kitchen-ku thevaiyana ellam"
        />

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoryScroll}
        >
          {CATEGORIES.map((item) => {
            const active = category === item.id;

            return (
              <TouchableOpacity
                key={item.id}
                onPress={() => chooseCategory(item.id)}
                style={[
                  styles.categoryCard,
                  active && styles.categoryActive,
                ]}
              >
                <Text style={styles.categoryEmoji}>
                  {item.icon}
                </Text>
                <Text
                  style={[
                    styles.categoryLabel,
                    active && styles.categoryLabelActive,
                  ]}
                >
                  {item.label}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>
    );
  }

  function Deals() {
    return (
      <View style={styles.dealRow}>
        <TouchableOpacity
          style={[styles.dealCard, { backgroundColor: '#F8E8D6' }]}
          onPress={() => chooseCategory('Rice & Dal')}
        >
          <View style={{ flex: 1 }}>
            <Text style={styles.dealEyebrow}>WEEKEND SPECIAL</Text>
            <Text style={styles.dealTitle}>Kitchen staples</Text>
            <Text style={styles.dealCopy}>
              Rice, dal and daily essentials
            </Text>
            <Text style={styles.dealLink}>Explore deal ↗</Text>
          </View>
          <Text style={styles.dealEmoji}>🌾</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.dealCard, { backgroundColor: '#E2EEDF' }]}
          onPress={() => chooseCategory('Dairy')}
        >
          <View style={{ flex: 1 }}>
            <Text style={styles.dealEyebrow}>GOOD MORNING</Text>
            <Text style={styles.dealTitle}>Breakfast picks</Text>
            <Text style={styles.dealCopy}>
              Paal, thayir and more
            </Text>
            <Text style={styles.dealLink}>Shop now ↗</Text>
          </View>
          <Text style={styles.dealEmoji}>🥛</Text>
        </TouchableOpacity>
      </View>
    );
  }

  function TrustStrip() {
    return (
      <View style={styles.trustStrip}>
        <View style={styles.trustItem}>
          <Text style={styles.trustEmoji}>🌿</Text>
          <View>
            <Text style={styles.trustTitle}>Fresh daily</Text>
            <Text style={styles.trustText}>Farm to home</Text>
          </View>
        </View>

        <View style={styles.trustDivider} />

        <View style={styles.trustItem}>
          <Text style={styles.trustEmoji}>🛵</Text>
          <View>
            <Text style={styles.trustTitle}>Quick delivery</Text>
            <Text style={styles.trustText}>Nearby stores</Text>
          </View>
        </View>

        <View style={styles.trustDivider} />

        <View style={styles.trustItem}>
          <Text style={styles.trustEmoji}>🤝</Text>
          <View>
            <Text style={styles.trustTitle}>Local support</Text>
            <Text style={styles.trustText}>Namma kadai</Text>
          </View>
        </View>
      </View>
    );
  }

  function CartSummary() {
    const delivery = deliveryFee;
    const defaultAddress = savedAddresses.find((address) => address.isDefault)
      || savedAddresses[0];
    const methods = [
      ['UPI', '📱', 'GPay, PhonePe'],
      ['Card', '💳', 'Credit / debit'],
      ['Cash on delivery', '💵', 'Pay at your door'],
    ];

    return (
      <View style={styles.cartSummary}>
        <Text style={styles.cartSummaryTitle}>Bill details</Text>

        <View style={styles.checkoutAddress}>
          <Text style={styles.checkoutAddressIcon}>📍</Text>
          <View style={styles.checkoutAddressCopy}>
            <Text style={styles.checkoutAddressTitle}>
              Deliver to {defaultAddress?.label || 'your address'}
            </Text>
            <Text style={styles.checkoutAddressText} numberOfLines={2}>
              {defaultAddress
                ? `${defaultAddress.line}, ${defaultAddress.pincode}`
                : 'Add a saved address for delivery'}
            </Text>
          </View>
          <TouchableOpacity
            onPress={() => {
              setTab('Profile');
              openAccountPage('addresses');
            }}
          >
            <Text style={styles.addressActionText}>
              {defaultAddress ? 'Change' : 'Add'}
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.billRow}>
          <Text style={styles.billLabel}>Item total</Text>
          <Text style={styles.billValue}>{money(cartTotal)}</Text>
        </View>

        {activeOffer && (
          <View style={styles.billRow}>
            <Text style={styles.offerBillLabel}>NAMMA10 discount</Text>
            <Text style={styles.offerBillLabel}>−{money(offerDiscount)}</Text>
          </View>
        )}

        <View style={styles.billRow}>
          <Text style={styles.billLabel}>Delivery fee</Text>
          <Text style={styles.billValue}>
            {delivery === 0 && cartTotal > 0 ? 'FREE' : money(delivery)}
          </Text>
        </View>

        <View style={styles.billLine} />

        <View style={styles.billRow}>
          <Text style={styles.grandTotalLabel}>To pay</Text>
          <Text style={styles.grandTotal}>
            {money(payableTotal)}
          </Text>
        </View>

        <Text style={styles.paymentHeading}>Choose payment method</Text>
        {methods.map(([method, icon, caption]) => {
          const active = paymentMethod === method;

          return (
            <TouchableOpacity
              key={method}
              style={[
                styles.paymentOption,
                active && styles.paymentOptionActive,
              ]}
              onPress={() => setPaymentMethod(method)}
            >
              <Text style={styles.paymentIcon}>{icon}</Text>
              <View style={styles.paymentOptionCopy}>
                <Text style={styles.paymentMethod}>{method}</Text>
                <Text style={styles.paymentCaption}>{caption}</Text>
              </View>
              <View
                style={[
                  styles.paymentRadio,
                  active && styles.paymentRadioActive,
                ]}
              >
                {active && <View style={styles.paymentRadioDot} />}
              </View>
            </TouchableOpacity>
          );
        })}

        <TouchableOpacity
          disabled={cartCount === 0}
          style={[
            styles.checkoutButton,
            cartCount === 0 && { opacity: 0.5 },
          ]}
          onPress={placeDemoOrder}
        >
          <Text style={styles.checkoutText}>
            Place demo order · {money(payableTotal)}
          </Text>
        </TouchableOpacity>

        <Text style={styles.checkoutNote}>
          Demo payment only · No real payment is processed
        </Text>
      </View>
    );
  }

  function EmptyState({ title, message, button, onPress }) {
    return (
      <View style={styles.emptyState}>
        <Text style={{ fontSize: 45 }}>🧺</Text>
        <Text style={styles.emptyTitle}>{title}</Text>
        <Text style={styles.emptyText}>{message}</Text>

        <TouchableOpacity
          style={styles.emptyButton}
          onPress={onPress}
        >
          <Text style={styles.emptyButtonText}>{button}</Text>
        </TouchableOpacity>
      </View>
    );
  }

  function ProfileScreen() {
    if (accountPage === 'login' || accountPage === 'register') {
      const isRegistering = accountPage === 'register';

      return (
        <View style={styles.profilePage}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => openAccountPage('account')}
          >
            <Text style={styles.backButtonText}>‹  Back to account</Text>
          </TouchableOpacity>

          <View style={styles.authCard}>
            <Text style={styles.authEmoji}>{isRegistering ? '🧺' : '👋'}</Text>
            <Text style={styles.authTitle}>
              {isRegistering ? 'Namma veetukku vaanga!' : 'Vanakkam, nanba!'}
            </Text>
            <Text style={styles.authSubtitle}>
              {isRegistering
                ? 'Create your Namma Market account'
                : 'Login to your Namma Market account'}
            </Text>

            {isRegistering && (
              <TextInput
                value={authName}
                onChangeText={(value) => {
                  setAuthName(value);
                  setAuthError('');
                }}
                placeholder="Ungal peyar"
                placeholderTextColor={C.muted}
                style={styles.authInput}
                autoCapitalize="words"
                returnKeyType="next"
              />
            )}

            <TextInput
              value={authEmail}
              onChangeText={(value) => {
                setAuthEmail(value);
                setAuthError('');
              }}
              placeholder="Gmail address"
              placeholderTextColor={C.muted}
              style={styles.authInput}
              keyboardType="email-address"
              autoCapitalize="none"
              autoComplete="email"
              textContentType="emailAddress"
              returnKeyType="next"
            />
            <TextInput
              value={authPassword}
              onChangeText={(value) => {
                setAuthPassword(value);
                setAuthError('');
              }}
              placeholder="Password"
              placeholderTextColor={C.muted}
              style={styles.authInput}
              secureTextEntry
              autoCapitalize="none"
              autoComplete={isRegistering ? 'new-password' : 'current-password'}
              textContentType={isRegistering ? 'newPassword' : 'password'}
              returnKeyType="done"
            />

            {!!authError && (
              <Text style={styles.authError}>{authError}</Text>
            )}

            <TouchableOpacity
              style={styles.authSubmit}
              onPress={submitAccountForm}
            >
              <Text style={styles.authSubmitText}>
                {isRegistering ? 'Create account  →' : 'Login  →'}
              </Text>
            </TouchableOpacity>

            <Text style={styles.demoNotice}>
              Demo login only · Gmail/password are not verified or saved
            </Text>

            <TouchableOpacity
              onPress={() => openAccountPage(isRegistering ? 'login' : 'register')}
              style={styles.authSwitch}
            >
              <Text style={styles.authSwitchText}>
                {isRegistering
                  ? 'Already have an account? Login'
                  : 'Pudhu account venuma? Create account'}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      );
    }

    if (accountPage === 'editProfile') {
      return (
        <View style={styles.profilePage}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => openAccountPage('account')}
          >
            <Text style={styles.backButtonText}>‹  Back to account</Text>
          </TouchableOpacity>
          <View style={styles.settingsCard}>
            <Text style={styles.settingsTitle}>Edit profile</Text>
            <Text style={styles.settingsSubtitle}>Ungal account details update pannunga</Text>
            <Text style={styles.fieldLabel}>Your name</Text>
            <TextInput
              value={profileNameInput}
              onChangeText={(value) => {
                setProfileNameInput(value);
                setProfileError('');
              }}
              placeholder="Ungal peyar"
              placeholderTextColor={C.muted}
              style={styles.authInput}
              autoCapitalize="words"
              returnKeyType="next"
            />
            <Text style={styles.fieldLabel}>Gmail address</Text>
            <TextInput
              value={profileEmailInput}
              onChangeText={(value) => {
                setProfileEmailInput(value);
                setProfileError('');
              }}
              placeholder="name@gmail.com"
              placeholderTextColor={C.muted}
              style={styles.authInput}
              keyboardType="email-address"
              autoCapitalize="none"
              autoComplete="email"
              textContentType="emailAddress"
            />
            {!!profileError && <Text style={styles.authError}>{profileError}</Text>}
            <TouchableOpacity style={styles.authSubmit} onPress={saveProfile}>
              <Text style={styles.authSubmitText}>Save profile</Text>
            </TouchableOpacity>
          </View>
        </View>
      );
    }

    if (accountPage === 'addresses') {
      return (
        <View style={styles.profilePage}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => openAccountPage('account')}
          >
            <Text style={styles.backButtonText}>‹  Back to account</Text>
          </TouchableOpacity>
          <View style={styles.settingsHeadingRow}>
            <View style={{ flex: 1 }}>
              <Text style={styles.settingsTitle}>Saved addresses</Text>
              <Text style={styles.settingsSubtitle}>Delivery enga varanum?</Text>
            </View>
            <TouchableOpacity style={styles.smallActionButton} onPress={() => startAddressForm()}>
              <Text style={styles.smallActionText}>＋ Add</Text>
            </TouchableOpacity>
          </View>

          {savedAddresses.length === 0 ? (
            <View style={styles.settingsEmpty}>
              <Text style={styles.authEmoji}>📍</Text>
              <Text style={styles.emptyTitle}>Address save pannala</Text>
              <Text style={styles.emptyText}>Delivery-ku unga veettu address add pannunga.</Text>
              <TouchableOpacity style={styles.authSubmit} onPress={() => startAddressForm()}>
                <Text style={styles.authSubmitText}>Add delivery address</Text>
              </TouchableOpacity>
            </View>
          ) : savedAddresses.map((address, index) => (
            <View key={`${address.pincode}-${index}`} style={styles.addressCard}>
              <View style={styles.addressCardHeading}>
                <Text style={styles.addressLabel}>📍  {address.label}</Text>
                {address.isDefault && (
                  <Text style={styles.defaultBadge}>DEFAULT</Text>
                )}
              </View>
              <Text style={styles.addressText}>{address.line}</Text>
              {!!address.landmark && (
                <Text style={styles.addressSecondary}>Near {address.landmark}</Text>
              )}
              <Text style={styles.addressSecondary}>Tamil Nadu · {address.pincode}</Text>
              <View style={styles.addressActions}>
                {!address.isDefault && (
                  <TouchableOpacity onPress={() => setDefaultAddress(index)}>
                    <Text style={styles.addressActionText}>Set as default</Text>
                  </TouchableOpacity>
                )}
                <TouchableOpacity onPress={() => startAddressForm(index)}>
                  <Text style={styles.addressActionText}>Edit</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => deleteAddress(index)}>
                  <Text style={styles.deleteActionText}>Delete</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </View>
      );
    }

    if (accountPage === 'addressForm') {
      return (
        <View style={styles.profilePage}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => openAccountPage('addresses')}
          >
            <Text style={styles.backButtonText}>‹  Back to saved addresses</Text>
          </TouchableOpacity>
          <View style={styles.settingsCard}>
            <Text style={styles.settingsTitle}>
              {editingAddressIndex === null ? 'Add delivery address' : 'Edit address'}
            </Text>
            <Text style={styles.settingsSubtitle}>Unga address details fill pannunga</Text>
            <Text style={styles.fieldLabel}>Address type</Text>
            <TextInput
              value={addressLabelInput}
              onChangeText={setAddressLabelInput}
              placeholder="Home / Work"
              placeholderTextColor={C.muted}
              style={styles.authInput}
              autoCapitalize="words"
            />
            <Text style={styles.fieldLabel}>Full address</Text>
            <TextInput
              value={addressLineInput}
              onChangeText={(value) => {
                setAddressLineInput(value);
                setAddressError('');
              }}
              placeholder="Door no, street, area, city"
              placeholderTextColor={C.muted}
              style={[styles.authInput, styles.multilineInput]}
              multiline
              textAlignVertical="top"
            />
            <Text style={styles.fieldLabel}>Landmark (optional)</Text>
            <TextInput
              value={addressLandmarkInput}
              onChangeText={setAddressLandmarkInput}
              placeholder="Near bus stop, temple..."
              placeholderTextColor={C.muted}
              style={styles.authInput}
            />
            <Text style={styles.fieldLabel}>Pincode</Text>
            <TextInput
              value={addressPincodeInput}
              onChangeText={(value) => {
                setAddressPincodeInput(value.replace(/\D/g, '').slice(0, 6));
                setAddressError('');
              }}
              placeholder="6 digit pincode"
              placeholderTextColor={C.muted}
              style={styles.authInput}
              keyboardType="number-pad"
              maxLength={6}
            />
            {!!addressError && <Text style={styles.authError}>{addressError}</Text>}
            <TouchableOpacity style={styles.authSubmit} onPress={saveAddress}>
              <Text style={styles.authSubmitText}>Save address</Text>
            </TouchableOpacity>
          </View>
        </View>
      );
    }

    if (accountPage === 'offers') {
      return (
        <View style={styles.profilePage}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => openAccountPage('account')}
          >
            <Text style={styles.backButtonText}>‹  Back to account</Text>
          </TouchableOpacity>
          <Text style={styles.settingsTitle}>Offers & rewards</Text>
          <Text style={styles.settingsSubtitle}>Ungalukku mattum Namma Market savings</Text>

          <View style={styles.rewardCard}>
            <Text style={styles.rewardEyebrow}>NAMMA REWARDS</Text>
            <Text style={styles.rewardPoints}>{rewardPoints} points</Text>
            <Text style={styles.rewardCaption}>Demo points earned from your orders</Text>
          </View>

          <View style={styles.offerCard}>
            <View style={styles.offerCardIcon}><Text style={{ fontSize: 25 }}>🎉</Text></View>
            <View style={styles.offerCardCopy}>
              <Text style={styles.offerCardTitle}>10% off your basket</Text>
              <Text style={styles.offerCardDescription}>Use NAMMA10 on your grocery order</Text>
              <Text style={styles.offerCode}>NAMMA10</Text>
            </View>
            <TouchableOpacity
              style={[styles.smallActionButton, activeOffer && styles.offerAppliedButton]}
              onPress={() => {
                setActiveOffer((applied) => !applied);
                openAccountPage('account');
              }}
            >
              <Text style={styles.smallActionText}>
                {activeOffer ? 'Applied' : 'Apply'}
              </Text>
            </TouchableOpacity>
          </View>
          <Text style={styles.demoNotice}>
            Offer is applied to your basket subtotal · Demo promotion
          </Text>
        </View>
      );
    }

    if (accountPage === 'help') {
      const topics = [
        ['How do I track my order?', 'Open Orders in the bottom menu or tap My orders here in your account. Demo orders show simulated delivery updates.'],
        ['How does payment work?', 'Choose UPI, card, or cash on delivery at checkout. This demo does not process real payments.'],
        ['How do I use an offer?', 'Open Offers & rewards, tap Apply on NAMMA10, then check the discount in your basket bill.'],
        ['How do I change my delivery address?', 'Open Saved addresses, add or edit an address, and choose which one is your default.'],
      ];

      return (
        <View style={styles.profilePage}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => openAccountPage('account')}
          >
            <Text style={styles.backButtonText}>‹  Back to account</Text>
          </TouchableOpacity>
          <Text style={styles.settingsTitle}>Help & support</Text>
          <Text style={styles.settingsSubtitle}>Namma team unga pakkathula irukku</Text>

          <View style={styles.supportBanner}>
            <Text style={styles.supportBannerIcon}>💬</Text>
            <View style={{ flex: 1 }}>
              <Text style={styles.supportBannerTitle}>How can we help?</Text>
              <Text style={styles.supportBannerCopy}>Common questions-ku quick answers inga.</Text>
            </View>
          </View>

          {topics.map(([question, answer]) => {
            const expanded = expandedHelpTopic === question;
            return (
              <TouchableOpacity
                key={question}
                style={styles.faqCard}
                onPress={() => setExpandedHelpTopic(expanded ? null : question)}
              >
                <View style={styles.faqQuestionRow}>
                  <Text style={styles.faqQuestion}>{question}</Text>
                  <Text style={styles.faqChevron}>{expanded ? '−' : '+'}</Text>
                </View>
                {expanded && <Text style={styles.faqAnswer}>{answer}</Text>}
              </TouchableOpacity>
            );
          })}

          <View style={styles.settingsCard}>
            <Text style={styles.settingsTitle}>Write to Namma support</Text>
            <Text style={styles.settingsSubtitle}>
              Demo-la message support team-ku send aagadhu; inga save aaguradhu indha session-ku mattum.
            </Text>
            <TextInput
              value={supportMessage}
              onChangeText={(value) => {
                setSupportMessage(value);
                setSupportMessageSaved(false);
              }}
              placeholder="Ungal kelvi illa problem type pannunga..."
              placeholderTextColor={C.muted}
              style={[styles.authInput, styles.multilineInput]}
              multiline
              textAlignVertical="top"
            />
            <TouchableOpacity
              style={[styles.authSubmit, !supportMessage.trim() && styles.disabledButton]}
              disabled={!supportMessage.trim()}
              onPress={() => setSupportMessageSaved(true)}
            >
              <Text style={styles.authSubmitText}>Save support message</Text>
            </TouchableOpacity>
            {supportMessageSaved && (
              <Text style={styles.supportSavedText}>
                Message saved for this session only. Backend connect pannina support-ku send pannalam.
              </Text>
            )}
          </View>
        </View>
      );
    }

    if (accountPage === 'logout') {
      return (
        <View style={styles.profilePage}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => openAccountPage('account')}
          >
            <Text style={styles.backButtonText}>‹  Back to account</Text>
          </TouchableOpacity>

          <View style={styles.logoutCard}>
            <Text style={styles.authEmoji}>👋</Text>
            <Text style={styles.authTitle}>Leaving already?</Text>
            <Text style={styles.authSubtitle}>
              {account?.name}, are you sure you want to log out?
            </Text>
            <TouchableOpacity
              style={styles.authSubmit}
              onPress={signOut}
            >
              <Text style={styles.authSubmitText}>Yes, log me out</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.stayButton}
              onPress={() => openAccountPage('account')}
            >
              <Text style={styles.stayButtonText}>Stay signed in</Text>
            </TouchableOpacity>
          </View>
        </View>
      );
    }

    const options = [
      ['📦', 'My orders', order ? `Order #${order.id} · Track delivery` : 'Track your grocery orders'],
      ['✏️', 'Edit profile', 'Name and Gmail update pannunga'],
      ['📍', 'Saved addresses', `${savedAddresses.length} delivery address${savedAddresses.length === 1 ? '' : 'es'}`],
      ['❤️', 'My favourites', `${favorites.length} items saved`],
      ['🎟️', 'Offers & rewards', `${rewardPoints} reward points · NAMMA10`],
      ['💬', 'Help & support', 'FAQs and customer support'],
    ];

    return (
      <View style={styles.profilePage}>
        <View style={styles.profileHero}>
          <Text style={{ fontSize: 42 }}>{account ? '🙏' : '👋'}</Text>
          <Text style={styles.profileTitle}>
            {account ? `Vanakkam, ${account.name}!` : 'Vanakkam, nanba!'}
          </Text>
          <Text style={styles.profileSubtitle}>
            {account
              ? `✉️  ${account.email}`
              : 'Namma Ooru shopping, ippo unga kai-la'}
          </Text>

          {account ? (
            <TouchableOpacity
              style={styles.signInButton}
              onPress={() => openAccountPage('logout')}
            >
              <Text style={styles.signInText}>Log out</Text>
            </TouchableOpacity>
          ) : (
            <View style={styles.accountActions}>
              <TouchableOpacity
                style={styles.signInButton}
                onPress={() => openAccountPage('login')}
              >
                <Text style={styles.signInText}>Login</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.createAccountButton}
                onPress={() => openAccountPage('register')}
              >
                <Text style={styles.createAccountText}>Create account</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>

        {options.map(([icon, title, subtitle]) => (
          <TouchableOpacity
            key={title}
            style={styles.profileMenu}
            onPress={() =>
              title === 'My favourites'
                ? navigate('Favorites')
                : title === 'My orders'
                  ? navigate('Tracking')
                  : title === 'Edit profile'
                    ? openProfileEditor()
                    : title === 'Saved addresses'
                      ? openAccountPage('addresses')
                      : title === 'Offers & rewards'
                        ? openAccountPage('offers')
                        : title === 'Help & support'
                          ? openAccountPage('help')
                          : undefined
            }
          >
            <Text style={styles.profileMenuIcon}>{icon}</Text>

            <View style={{ flex: 1 }}>
              <Text style={styles.profileMenuTitle}>{title}</Text>
              <Text style={styles.profileMenuSubtitle}>
                {subtitle}
              </Text>
            </View>

            <Text style={styles.chevron}>›</Text>
          </TouchableOpacity>
        ))}

        <Text style={styles.profileFoot}>
          Namma Market · Nalla porul. Nalla vilai. Namma ooru.
        </Text>
      </View>
    );
  }

  function ProductDetails() {
    if (!selected) return null;

    return (
      <View style={styles.detailOverlay}>
        <View style={styles.detailSheet}>
          <TouchableOpacity
            style={styles.closeButton}
            onPress={() => setSelected(null)}
          >
            <Text style={{ fontSize: 24, color: C.ink }}>×</Text>
          </TouchableOpacity>

          <Image
            source={selected.localImage || { uri: selected.image }}
            style={styles.detailImage}
            resizeMode="cover"
          />

          <ScrollView>
            <View style={styles.detailContent}>
              <Text style={styles.detailTag}>
                🌿 {selected.badge}
              </Text>

              {!!selected.imageCredit && (
                <TouchableOpacity
                  onPress={() =>
                    Linking.openURL(selected.imageSource).catch(() =>
                      Alert.alert('Image credit', 'Could not open the image source.')
                    )
                  }
                >
                  <Text style={styles.imageCredit}>
                    Photo: {selected.imageCredit} · Source
                  </Text>
                </TouchableOpacity>
              )}

              <Text style={styles.detailName}>
                {selected.name}
              </Text>

              <Text style={styles.detailEnglish}>
                {selected.english} · {selected.unit}
              </Text>

              <Text style={styles.detailCategory}>
                {CATEGORIES.find((item) => item.id === selected.category)?.label}
              </Text>

              <Text style={styles.detailPrice}>
                {money(selected.price)}
                <Text style={styles.detailPer}>
                  {' '}/ {selected.unit}
                </Text>
              </Text>

              <Text style={styles.detailDescription}>
                {selected.description}
              </Text>

              <Text style={styles.detailInfo}>
                ✓ Quality checked     ✓ Local sourcing
              </Text>

              <TouchableOpacity
                style={styles.detailAdd}
                onPress={() => {
                  changeQuantity(selected.id, 1);
                  setSelected(null);
                }}
              >
                <Text style={styles.detailAddText}>
                  Add to basket · {money(selected.price)}
                </Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>
      </View>
    );
  }

  function MainContent() {
    if (tab === 'Tracking') {
      if (!order) {
        return (
          <View style={styles.pageBody}>
            <SectionTitle
              title="Order tracking"
              subtitle="Ungal order enga irukku-nu paarunga"
            />
            <EmptyState
              title="Innum order place pannala"
              message="Basket-la groceries add panni order place pannunga. Tracking inga theriyum."
              button="Start shopping"
              onPress={() => navigate('Home')}
            />
          </View>
        );
      }

      const stages = [
        ['✓', 'Order confirmed', 'Namma kadai unga order-a receive pannirukku'],
        ['🧺', 'Packing your groceries', 'Fresh items careful-ah pack aagudhu'],
        ['🛵', 'Out for delivery', 'Delivery partner unga veettukku varanga'],
        ['🏠', 'Delivered', 'Ungal order safe-ah deliver aayiduchu'],
      ];

      return (
        <View style={styles.pageBody}>
          <View style={styles.orderSuccessCard}>
            <View style={styles.orderSuccessIcon}>
              <Text style={styles.orderSuccessIconText}>✓</Text>
            </View>
            <View style={styles.orderSuccessCopy}>
              <Text style={styles.orderSuccessTitle}>Order placed successfully!</Text>
              <Text style={styles.orderSuccessPayment}>
                {order.paymentStatus} · {money(order.total)}
              </Text>
              <Text style={styles.orderSuccessNote}>
                {order.paymentMethod === 'Cash on delivery'
                  ? 'Order confirm aayiduchu. Delivery time-la payment pannunga.'
                  : 'Demo only · No real payment was processed.'}
              </Text>
            </View>
          </View>

          <View style={styles.trackingHeader}>
            <Text style={styles.trackingEyebrow}>NAMMA MARKET · ORDER TRACKING</Text>
            <Text style={styles.trackingTitle}>Order #{order.id}</Text>
            <Text style={styles.trackingSubtitle}>
              {orderStage === stages.length - 1
                ? 'Order delivered · Nandri!'
                : 'Expected delivery · 20–30 mins'}
            </Text>
          </View>

          <View style={styles.trackingCard}>
            {stages.map(([icon, title, description], index) => {
              const complete = index <= orderStage;

              return (
                <View key={title} style={styles.trackingStep}>
                  <View style={styles.trackingRail}>
                    <View
                      style={[
                        styles.trackingDot,
                        complete && styles.trackingDotActive,
                      ]}
                    >
                      <Text
                        style={[
                          styles.trackingDotText,
                          complete && styles.trackingDotTextActive,
                        ]}
                      >
                        {complete ? icon : index + 1}
                      </Text>
                    </View>
                    {index < stages.length - 1 && (
                      <View
                        style={[
                          styles.trackingLine,
                          index < orderStage && styles.trackingLineActive,
                        ]}
                      />
                    )}
                  </View>
                  <View style={styles.trackingStepCopy}>
                    <Text
                      style={[
                        styles.trackingStepTitle,
                        complete && styles.trackingStepTitleActive,
                      ]}
                    >
                      {title}
                    </Text>
                    <Text style={styles.trackingStepDescription}>
                      {description}
                    </Text>
                  </View>
                </View>
              );
            })}

            <View style={styles.trackingDivider} />
            <View style={styles.billRow}>
              <Text style={styles.billLabel}>Payment</Text>
              <Text style={styles.billValue}>{order.paymentMethod} · Demo</Text>
            </View>
            {!!order.discount && (
              <View style={styles.billRow}>
                <Text style={styles.offerBillLabel}>NAMMA10 discount</Text>
                <Text style={styles.offerBillLabel}>−{money(order.discount)}</Text>
              </View>
            )}
            <View style={styles.billRow}>
              <Text style={styles.billLabel}>Order total</Text>
              <Text style={styles.grandTotal}>{money(order.total)}</Text>
            </View>
          </View>

          <View style={styles.orderItemsCard}>
            <Text style={styles.cartSummaryTitle}>Order items</Text>
            {order.items.map((item) => (
              <View key={item.id} style={styles.billRow}>
                <Text style={styles.billLabel}>
                  {item.name} × {item.quantity}
                </Text>
                <Text style={styles.billValue}>
                  {money(item.price * item.quantity)}
                </Text>
              </View>
            ))}
          </View>

          {orderStage < stages.length - 1 && (
            <TouchableOpacity
              style={styles.trackingDemoButton}
              onPress={() => setOrderStage((stage) => Math.min(stage + 1, stages.length - 1))}
            >
              <Text style={styles.trackingDemoButtonText}>
                Simulate next tracking update →
              </Text>
            </TouchableOpacity>
          )}
          <Text style={styles.checkoutNote}>
            Demo tracking · Status updates are simulated, not live GPS
          </Text>
        </View>
      );
    }

    if (tab === 'Cart') {
      return (
        <View style={styles.pageBody}>
          <SectionTitle
            title="My basket"
            subtitle="Ungal shopping list"
          />

          {products.length === 0 ? (
            <EmptyState
              title="Your basket is waiting"
              message="Add your daily essentials and they will show up here."
              button="Start shopping"
              onPress={() => navigate('Home')}
            />
          ) : (
            <>
              <ProductGrid items={products} />
              <CartSummary />
            </>
          )}
        </View>
      );
    }

    if (tab === 'Favorites') {
      return (
        <View style={styles.pageBody}>
          <SectionTitle
            title="Your favourites"
            subtitle="Ungalukku pidicha items"
          />

          {products.length === 0 ? (
            <EmptyState
              title="No favourites yet"
              message="Tap the heart on any product to save it here."
              button="Discover products"
              onPress={() => navigate('Home')}
            />
          ) : (
            <ProductGrid items={products} />
          )}
        </View>
      );
    }

    return (
      <>
        {!search && category === 'All' && !showAll && (
          <>
            <Hero />
            <TrustStrip />
          </>
        )}

        <Categories />

        {!search && category === 'All' && !showAll && <Deals />}

        <View style={styles.section}>
          <SectionTitle
            title={
              search
                ? `Search results (${products.length})`
                : category !== 'All'
                ? CATEGORIES.find((x) => x.id === category)?.label
                : showAll
                ? 'All groceries'
                : 'Namma picks'
            }
            subtitle="Fresh choices for your everyday kitchen"
            action={
              !showAll && category === 'All' && !search
                ? 'View all'
                : null
            }
            onAction={() => setShowAll(true)}
          />

          {products.length > 0 ? (
            <ProductGrid items={products} />
          ) : (
            <View style={styles.noResults}>
              <Text style={{ fontSize: 35 }}>🔎</Text>
              <Text style={styles.emptyTitle}>No items found</Text>
              <Text style={styles.emptyText}>
                Try another search or category.
              </Text>
              <TouchableOpacity
                onPress={() => {
                  setSearch('');
                  setCategory('All');
                }}
              >
                <Text style={styles.viewAll}>Clear filters</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>

        {!search && category === 'All' && !showAll && (
          <View style={styles.localBanner}>
            <Text style={{ fontSize: 32, marginRight: 12 }}>🏪</Text>
            <View style={{ flex: 1 }}>
              <Text style={styles.localBannerTitle}>
                Support Namma Ooru kadai
              </Text>
              <Text style={styles.localBannerText}>
                Every basket helps local shops and neighbourhood
                farmers grow.
              </Text>
            </View>
          </View>
        )}
      </>
    );
  }

  if (!account) {
    const isRegistering = accountPage === 'register';

    return (
      <SafeAreaView style={styles.loginScreen}>
        <StatusBar barStyle="dark-content" backgroundColor={C.cream} />
        <ScrollView
          contentContainerStyle={styles.loginContent}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.loginBrand}>
            <View style={styles.loginLogo}>
              <Text style={styles.loginLogoLeaf}>🌿</Text>
            </View>
            <Text style={styles.loginBrandName}>
              Namma <Text style={styles.loginBrandHighlight}>Market</Text>
            </Text>
            <Text style={styles.loginBrandTag}>உங்க ஊரு • உங்க மளிகை</Text>
          </View>

          <View style={styles.authCard}>
            <Text style={styles.authEmoji}>{isRegistering ? '🧺' : '👋'}</Text>
            <Text style={styles.authTitle}>
              {isRegistering ? 'Namma veetukku vaanga!' : 'Vanakkam, nanba!'}
            </Text>
            <Text style={styles.authSubtitle}>
              {isRegistering
                ? 'Create your account and start shopping'
                : 'Login pannitu fresh groceries vaangunga'}
            </Text>

            {isRegistering && (
              <TextInput
                value={authName}
                onChangeText={(value) => {
                  setAuthName(value);
                  setAuthError('');
                }}
                placeholder="Ungal peyar"
                placeholderTextColor={C.muted}
                style={styles.authInput}
                autoCapitalize="words"
                returnKeyType="next"
              />
            )}

            <TextInput
              value={authEmail}
              onChangeText={(value) => {
                setAuthEmail(value);
                setAuthError('');
              }}
              placeholder="Gmail address"
              placeholderTextColor={C.muted}
              style={styles.authInput}
              keyboardType="email-address"
              autoCapitalize="none"
              autoComplete="email"
              textContentType="emailAddress"
              returnKeyType="next"
            />
            <TextInput
              value={authPassword}
              onChangeText={(value) => {
                setAuthPassword(value);
                setAuthError('');
              }}
              placeholder="Password"
              placeholderTextColor={C.muted}
              style={styles.authInput}
              secureTextEntry
              autoCapitalize="none"
              autoComplete={isRegistering ? 'new-password' : 'current-password'}
              textContentType={isRegistering ? 'newPassword' : 'password'}
              returnKeyType="done"
            />

            {!!authError && (
              <Text style={styles.authError}>{authError}</Text>
            )}

            <TouchableOpacity
              style={styles.authSubmit}
              onPress={submitAccountForm}
            >
              <Text style={styles.authSubmitText}>
                {isRegistering ? 'Create account  →' : 'Login & shop groceries  →'}
              </Text>
            </TouchableOpacity>

            <Text style={styles.demoNotice}>
              Demo login only · Gmail/password are not verified or saved
            </Text>

            <TouchableOpacity
              onPress={() => openAccountPage(isRegistering ? 'login' : 'register')}
              style={styles.authSwitch}
            >
              <Text style={styles.authSwitchText}>
                {isRegistering
                  ? 'Already have an account? Login'
                  : 'Pudhu account venuma? Create account'}
              </Text>
            </TouchableOpacity>
          </View>

          <Text style={styles.loginFooter}>
            Nalla porul. Nalla vilai. Namma ooru.
          </Text>
        </ScrollView>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar
        barStyle="light-content"
        backgroundColor={C.green}
      />

      <Header />
      {tab !== 'Profile' && <SearchBar />}

      <ScrollView
        style={styles.mainScroll}
        contentContainerStyle={styles.mainContent}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        {tab === 'Profile' ? ProfileScreen() : MainContent()}

        <View style={styles.footer}>
          <Text style={styles.footerBrand}>🌿 Namma Market</Text>
          <Text style={styles.footerText}>
            Nalla porul. Nalla vilai. Namma ooru.
          </Text>
          <Text style={styles.footerSmall}>
            Grocery shopping demo · Tamil Nadu
          </Text>
        </View>
      </ScrollView>

      <ProductDetails />

      <View style={styles.bottomNav}>
        {[
          ['Home', '⌂'],
          ['Favorites', '♡'],
          ['Cart', '🛒'],
          ['Tracking', '📦'],
          ['Profile', '☻'],
        ].map(([name, icon]) => {
          const active = tab === name;
          const label = name === 'Profile'
            ? 'Account'
            : name === 'Tracking'
              ? 'Orders'
              : name;

          return (
            <TouchableOpacity
              key={name}
              style={styles.navItem}
              onPress={() => navigate(name)}
            >
              <View
                style={[
                  styles.navIconWrap,
                  active && styles.navIconWrapActive,
                ]}
              >
                <Text
                  style={[
                    styles.navIcon,
                    active && styles.navIconActive,
                  ]}
                >
                  {icon}
                </Text>

                {name === 'Cart' && cartCount > 0 && (
                  <View style={styles.cartBadge}>
                    <Text style={styles.cartBadgeText}>
                      {cartCount}
                    </Text>
                  </View>
                )}
              </View>

              <Text
                style={[
                  styles.navLabel,
                  active && styles.navLabelActive,
                ]}
              >
                {label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  loginScreen: {
    flex: 1,
    backgroundColor: C.cream,
  },

  loginContent: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
    paddingTop: 36,
    paddingBottom: 24,
  },

  loginBrand: {
    alignItems: 'center',
    marginBottom: 26,
  },

  loginLogo: {
    width: 76,
    height: 76,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: C.green,
    borderRadius: 26,
    marginBottom: 12,
    shadowColor: C.green,
    shadowOpacity: 0.18,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 6 },
    elevation: 4,
  },

  loginLogoLeaf: {
    fontSize: 39,
  },

  loginBrandName: {
    color: C.green,
    fontSize: 27,
    fontWeight: '900',
    letterSpacing: -0.8,
  },

  loginBrandHighlight: {
    color: C.orange,
  },

  loginBrandTag: {
    color: C.muted,
    fontSize: 12,
    marginTop: 5,
  },

  loginFooter: {
    color: C.muted,
    fontSize: 10,
    textAlign: 'center',
    marginTop: 10,
  },

  safeArea: {
    flex: 1,
    backgroundColor: C.cream,
  },

  header: {
    backgroundColor: C.green,
    paddingHorizontal: 17,
    paddingTop: 10,
    paddingBottom: 17,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  brandRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  logo: {
    width: 43,
    height: 43,
    borderRadius: 14,
    backgroundColor: C.white,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 9,
  },

  brandName: {
    color: C.white,
    fontSize: 21,
    fontWeight: '900',
    letterSpacing: -0.5,
  },

  brandTag: {
    color: '#D9E8D8',
    fontSize: 10,
    marginTop: 3,
  },

  locationChip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.12)',
    paddingHorizontal: 9,
    paddingVertical: 8,
    borderRadius: 12,
  },

  locationSmall: {
    color: '#C5DCCB',
    fontSize: 8,
    fontWeight: '800',
  },

  locationCity: {
    color: C.white,
    fontSize: 10,
    fontWeight: '800',
    marginTop: 3,
  },

  searchWrap: {
    marginHorizontal: 15,
    marginTop: 10,
    marginBottom: 12,
    backgroundColor: C.white,
    borderRadius: 14,
    minHeight: 49,
    paddingHorizontal: 12,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: C.line,
  },

  searchIcon: {
    fontSize: 25,
    color: C.green,
    marginRight: 8,
  },

  searchInput: {
    flex: 1,
    color: C.ink,
    fontSize: 12,
    paddingVertical: 10,
  },

  mainScroll: {
    flex: 1,
  },

  mainContent: {
    paddingBottom: 14,
  },

  hero: {
    marginHorizontal: 15,
    height: 220,
    borderRadius: 22,
    overflow: 'hidden',
    backgroundColor: C.green,
    justifyContent: 'center',
    padding: 17,
  },

  heroImage: {
    borderRadius: 22,
  },

  heroShade: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(12,39,25,0.70)',
  },

  heroContent: {
    width: '75%',
    zIndex: 1,
  },

  heroEyebrow: {
    alignSelf: 'flex-start',
    color: '#EAF7D7',
    backgroundColor: 'rgba(255,255,255,0.18)',
    borderRadius: 15,
    paddingHorizontal: 9,
    paddingVertical: 6,
    fontSize: 8,
    fontWeight: '900',
    overflow: 'hidden',
    marginBottom: 10,
  },

  heroTitle: {
    color: C.white,
    fontSize: 25,
    lineHeight: 30,
    fontWeight: '900',
  },

  heroSubtitle: {
    color: '#E4EEE5',
    fontSize: 10,
    lineHeight: 15,
    marginTop: 8,
  },

  heroButton: {
    backgroundColor: C.yellow,
    alignSelf: 'flex-start',
    paddingHorizontal: 13,
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 12,
  },

  heroButtonText: {
    color: C.green,
    fontWeight: '900',
    fontSize: 10,
  },

  offerCircle: {
    position: 'absolute',
    right: 10,
    bottom: 13,
    backgroundColor: C.yellow,
    width: 76,
    height: 76,
    borderRadius: 38,
    alignItems: 'center',
    justifyContent: 'center',
    transform: [{ rotate: '7deg' }],
  },

  offerSmall: {
    color: C.green,
    fontSize: 7,
    fontWeight: '900',
  },

  offerBig: {
    color: C.green,
    fontSize: 15,
    fontWeight: '900',
    marginVertical: 2,
  },

  trustStrip: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: 15,
    marginTop: 12,
    paddingVertical: 13,
    paddingHorizontal: 6,
    backgroundColor: C.white,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: C.line,
  },

  trustItem: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },

  trustEmoji: {
    fontSize: 18,
    marginRight: 5,
  },

  trustTitle: {
    color: C.ink,
    fontSize: 9,
    fontWeight: '900',
  },

  trustText: {
    color: C.muted,
    fontSize: 8,
    marginTop: 3,
  },

  trustDivider: {
    width: 1,
    height: 27,
    backgroundColor: C.line,
  },

  section: {
    marginTop: 22,
  },

  sectionHeading: {
    paddingHorizontal: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 13,
  },

  sectionTitle: {
    color: C.ink,
    fontSize: 18,
    fontWeight: '900',
    letterSpacing: -0.4,
  },

  sectionSubtitle: {
    color: C.muted,
    fontSize: 10,
    marginTop: 4,
  },

  viewAll: {
    color: C.green2,
    fontSize: 11,
    fontWeight: '900',
  },

  categoryScroll: {
    paddingHorizontal: 15,
    paddingBottom: 2,
  },

  categoryCard: {
    width: 82,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 9,
    paddingVertical: 12,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: C.line,
    backgroundColor: C.white,
  },

  categoryActive: {
    backgroundColor: C.green,
    borderColor: C.green,
  },

  categoryEmoji: {
    fontSize: 24,
    marginBottom: 7,
  },

  categoryLabel: {
    color: C.ink,
    fontSize: 9,
    fontWeight: '800',
    textAlign: 'center',
    paddingHorizontal: 2,
  },

  categoryLabelActive: {
    color: C.white,
  },

  dealRow: {
    flexDirection: 'row',
    paddingHorizontal: 15,
    marginTop: 21,
    gap: 10,
  },

  dealCard: {
    flex: 1,
    minHeight: 130,
    borderRadius: 17,
    padding: 11,
    flexDirection: 'row',
    overflow: 'hidden',
  },

  dealEyebrow: {
    color: C.green2,
    fontSize: 7,
    fontWeight: '900',
  },

  dealTitle: {
    color: C.ink,
    fontSize: 13,
    fontWeight: '900',
    marginTop: 7,
  },

  dealCopy: {
    color: '#5F6C60',
    fontSize: 9,
    lineHeight: 13,
    marginTop: 4,
  },

  dealLink: {
    color: C.green,
    fontSize: 9,
    fontWeight: '900',
    marginTop: 9,
  },

  dealEmoji: {
    fontSize: 35,
    alignSelf: 'center',
  },

  productGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
  },

  gridCell: {
    width: '48.3%',
    marginBottom: 12,
  },

  productCard: {
    backgroundColor: C.white,
    borderRadius: 17,
    borderWidth: 1,
    borderColor: '#ECE9E0',
    overflow: 'hidden',
  },

  productImageWrap: {
    height: 125,
    backgroundColor: '#E7EBDD',
  },

  productImage: {
    width: '100%',
    height: '100%',
  },

  badge: {
    position: 'absolute',
    left: 7,
    top: 7,
    backgroundColor: 'rgba(255,255,255,0.94)',
    paddingHorizontal: 7,
    paddingVertical: 5,
    borderRadius: 7,
  },

  badgeText: {
    color: C.green,
    fontSize: 7,
    fontWeight: '900',
  },

  heart: {
    position: 'absolute',
    right: 7,
    top: 7,
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: C.white,
    alignItems: 'center',
    justifyContent: 'center',
  },

  productInfo: {
    paddingHorizontal: 9,
    paddingTop: 9,
    paddingBottom: 10,
  },

  productName: {
    color: C.ink,
    fontSize: 12,
    fontWeight: '900',
  },

  productEnglish: {
    color: C.muted,
    fontSize: 9,
    marginTop: 3,
  },

  productDetailsLink: {
    alignSelf: 'flex-start',
    paddingTop: 6,
    paddingBottom: 2,
  },

  productDetailsText: {
    color: C.green2,
    fontSize: 9,
    fontWeight: '800',
  },

  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 10,
  },

  price: {
    color: C.green,
    fontSize: 15,
    fontWeight: '900',
  },

  unit: {
    color: C.muted,
    fontSize: 8,
    marginTop: 2,
  },

  addButton: {
    borderWidth: 1,
    borderColor: C.green,
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 7,
    backgroundColor: '#F6FBF5',
  },

  addButtonText: {
    color: C.green,
    fontSize: 10,
    fontWeight: '900',
  },

  quantityControl: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: C.green,
    borderRadius: 8,
    paddingHorizontal: 2,
    paddingVertical: 2,
  },

  qtyButton: {
    width: 22,
    height: 23,
    alignItems: 'center',
    justifyContent: 'center',
  },

  qtySymbol: {
    color: C.white,
    fontSize: 17,
    fontWeight: '700',
  },

  qtyNumber: {
    color: C.white,
    fontSize: 10,
    fontWeight: '900',
    minWidth: 15,
    textAlign: 'center',
  },

  pageBody: {
    paddingTop: 7,
  },

  localBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: C.green,
    borderRadius: 17,
    marginHorizontal: 15,
    marginTop: 7,
    padding: 15,
  },

  localBannerTitle: {
    color: C.white,
    fontSize: 13,
    fontWeight: '900',
  },

  localBannerText: {
    color: '#D9E8DC',
    fontSize: 10,
    lineHeight: 15,
    marginTop: 4,
  },

  emptyState: {
    alignItems: 'center',
    paddingVertical: 40,
    paddingHorizontal: 20,
    backgroundColor: C.white,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: C.line,
    marginHorizontal: 15,
    marginBottom: 20,
  },

  emptyTitle: {
    color: C.ink,
    fontSize: 16,
    fontWeight: '900',
    marginTop: 9,
    textAlign: 'center',
  },

  emptyText: {
    color: C.muted,
    fontSize: 11,
    lineHeight: 17,
    textAlign: 'center',
    marginTop: 6,
    maxWidth: 260,
  },

  emptyButton: {
    backgroundColor: C.green,
    borderRadius: 10,
    paddingHorizontal: 17,
    paddingVertical: 11,
    marginTop: 16,
  },

  emptyButtonText: {
    color: C.white,
    fontSize: 11,
    fontWeight: '900',
  },

  noResults: {
    alignItems: 'center',
    paddingVertical: 35,
  },

  cartSummary: {
    backgroundColor: C.white,
    borderRadius: 17,
    borderWidth: 1,
    borderColor: C.line,
    marginHorizontal: 15,
    marginTop: 5,
    padding: 15,
  },

  cartSummaryTitle: {
    color: C.ink,
    fontSize: 15,
    fontWeight: '900',
    marginBottom: 10,
  },

  checkoutAddress: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: C.cream,
    borderRadius: 11,
    padding: 10,
    marginBottom: 12,
  },

  checkoutAddressIcon: {
    fontSize: 19,
    marginRight: 9,
  },

  checkoutAddressCopy: {
    flex: 1,
  },

  checkoutAddressTitle: {
    color: C.ink,
    fontSize: 10,
    fontWeight: '900',
  },

  checkoutAddressText: {
    color: C.muted,
    fontSize: 9,
    lineHeight: 13,
    marginTop: 3,
  },

  billRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 6,
  },

  billLabel: {
    color: C.muted,
    fontSize: 11,
  },

  billValue: {
    color: C.ink,
    fontSize: 11,
    fontWeight: '700',
  },

  offerBillLabel: {
    color: C.green2,
    fontSize: 11,
    fontWeight: '800',
  },

  billLine: {
    height: 1,
    backgroundColor: C.line,
    marginVertical: 9,
  },

  grandTotalLabel: {
    color: C.ink,
    fontSize: 13,
    fontWeight: '900',
  },

  grandTotal: {
    color: C.green,
    fontSize: 17,
    fontWeight: '900',
  },

  checkoutButton: {
    backgroundColor: C.green,
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 14,
  },

  checkoutText: {
    color: C.white,
    fontSize: 12,
    fontWeight: '900',
  },

  checkoutNote: {
    color: C.muted,
    fontSize: 9,
    textAlign: 'center',
    marginTop: 10,
  },

  paymentHeading: {
    color: C.ink,
    fontSize: 12,
    fontWeight: '900',
    marginTop: 18,
    marginBottom: 8,
  },

  paymentOption: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 11,
    paddingVertical: 10,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: C.line,
    marginBottom: 7,
  },

  paymentOptionActive: {
    borderColor: C.green,
    backgroundColor: '#F3F8F2',
  },

  paymentIcon: {
    fontSize: 19,
    marginRight: 10,
  },

  paymentOptionCopy: {
    flex: 1,
  },

  paymentMethod: {
    color: C.ink,
    fontSize: 11,
    fontWeight: '800',
  },

  paymentCaption: {
    color: C.muted,
    fontSize: 9,
    marginTop: 2,
  },

  paymentRadio: {
    width: 18,
    height: 18,
    borderRadius: 9,
    borderWidth: 1,
    borderColor: C.muted,
    alignItems: 'center',
    justifyContent: 'center',
  },

  paymentRadioActive: {
    borderColor: C.green,
  },

  paymentRadioDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: C.green,
  },

  trackingHeader: {
    backgroundColor: C.green,
    borderRadius: 18,
    padding: 17,
    marginHorizontal: 15,
    marginBottom: 12,
  },

  orderSuccessCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#EAF5E8',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#C9E3C4',
    marginHorizontal: 15,
    marginBottom: 12,
    padding: 14,
  },

  orderSuccessIcon: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: C.green,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 11,
  },

  orderSuccessIconText: {
    color: C.white,
    fontSize: 23,
    fontWeight: '900',
  },

  orderSuccessCopy: {
    flex: 1,
  },

  orderSuccessTitle: {
    color: C.green,
    fontSize: 13,
    fontWeight: '900',
  },

  orderSuccessPayment: {
    color: C.ink,
    fontSize: 11,
    fontWeight: '800',
    marginTop: 4,
  },

  orderSuccessNote: {
    color: C.muted,
    fontSize: 9,
    lineHeight: 13,
    marginTop: 3,
  },

  trackingEyebrow: {
    color: '#C5DCCB',
    fontSize: 8,
    fontWeight: '900',
    letterSpacing: 0.5,
  },

  trackingTitle: {
    color: C.white,
    fontSize: 19,
    fontWeight: '900',
    marginTop: 7,
  },

  trackingSubtitle: {
    color: '#E2EDE4',
    fontSize: 10,
    marginTop: 4,
  },

  trackingCard: {
    backgroundColor: C.white,
    borderRadius: 17,
    borderWidth: 1,
    borderColor: C.line,
    marginHorizontal: 15,
    padding: 15,
  },

  trackingStep: {
    minHeight: 65,
    flexDirection: 'row',
  },

  trackingRail: {
    width: 32,
    alignItems: 'center',
  },

  trackingDot: {
    width: 26,
    height: 26,
    borderRadius: 13,
    borderWidth: 1,
    borderColor: C.line,
    backgroundColor: C.cream,
    alignItems: 'center',
    justifyContent: 'center',
  },

  trackingDotActive: {
    backgroundColor: C.mint,
    borderColor: C.green,
  },

  trackingDotText: {
    color: C.muted,
    fontSize: 10,
    fontWeight: '800',
  },

  trackingDotTextActive: {
    color: C.green,
  },

  trackingLine: {
    width: 2,
    flex: 1,
    backgroundColor: C.line,
    marginVertical: 3,
  },

  trackingLineActive: {
    backgroundColor: C.green2,
  },

  trackingStepCopy: {
    flex: 1,
    paddingLeft: 9,
    paddingTop: 2,
  },

  trackingStepTitle: {
    color: C.muted,
    fontSize: 11,
    fontWeight: '800',
  },

  trackingStepTitleActive: {
    color: C.green,
  },

  trackingStepDescription: {
    color: C.muted,
    fontSize: 9,
    lineHeight: 14,
    marginTop: 3,
  },

  trackingDivider: {
    height: 1,
    backgroundColor: C.line,
    marginVertical: 10,
  },

  orderItemsCard: {
    backgroundColor: C.white,
    borderRadius: 17,
    borderWidth: 1,
    borderColor: C.line,
    marginHorizontal: 15,
    marginTop: 10,
    padding: 15,
  },

  trackingDemoButton: {
    alignItems: 'center',
    backgroundColor: C.green,
    borderRadius: 12,
    paddingVertical: 13,
    marginHorizontal: 15,
    marginTop: 12,
  },

  trackingDemoButtonText: {
    color: C.white,
    fontSize: 11,
    fontWeight: '900',
  },

  profilePage: {
    paddingHorizontal: 15,
    paddingTop: 8,
  },

  profileHero: {
    backgroundColor: C.green,
    borderRadius: 20,
    padding: 22,
    alignItems: 'center',
    marginBottom: 15,
  },

  accountActions: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },

  profileTitle: {
    color: C.white,
    fontSize: 22,
    fontWeight: '900',
    marginTop: 10,
  },

  profileSubtitle: {
    color: '#D9E8DC',
    fontSize: 11,
    marginTop: 3,
  },

  signInButton: {
    backgroundColor: C.yellow,
    borderRadius: 11,
    paddingHorizontal: 20,
    paddingVertical: 11,
    marginTop: 15,
    marginRight: 8,
  },

  signInText: {
    color: C.green,
    fontSize: 11,
    fontWeight: '900',
  },

  createAccountButton: {
    borderWidth: 1,
    borderColor: '#8BAE98',
    borderRadius: 11,
    paddingHorizontal: 16,
    paddingVertical: 10,
    marginTop: 15,
  },

  createAccountText: {
    color: C.white,
    fontSize: 11,
    fontWeight: '900',
  },

  backButton: {
    alignSelf: 'flex-start',
    paddingVertical: 8,
    paddingHorizontal: 2,
    marginBottom: 10,
  },

  backButtonText: {
    color: C.green,
    fontSize: 12,
    fontWeight: '800',
  },

  authCard: {
    backgroundColor: C.white,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: C.line,
    padding: 20,
    alignItems: 'center',
    marginBottom: 12,
  },

  logoutCard: {
    backgroundColor: C.white,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: C.line,
    padding: 24,
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 12,
  },

  authEmoji: {
    fontSize: 42,
  },

  authTitle: {
    color: C.ink,
    fontSize: 19,
    fontWeight: '900',
    textAlign: 'center',
    marginTop: 10,
  },

  authSubtitle: {
    color: C.muted,
    fontSize: 11,
    lineHeight: 17,
    textAlign: 'center',
    marginTop: 5,
    marginBottom: 18,
  },

  authInput: {
    width: '100%',
    backgroundColor: C.cream,
    borderWidth: 1,
    borderColor: C.line,
    borderRadius: 12,
    color: C.ink,
    fontSize: 13,
    paddingHorizontal: 14,
    paddingVertical: 12,
    marginBottom: 10,
  },

  authError: {
    alignSelf: 'flex-start',
    color: '#B42318',
    fontSize: 11,
    marginBottom: 8,
  },

  authSubmit: {
    width: '100%',
    alignItems: 'center',
    backgroundColor: C.green,
    borderRadius: 12,
    paddingVertical: 14,
    marginTop: 4,
  },

  authSubmitText: {
    color: C.white,
    fontSize: 12,
    fontWeight: '900',
  },

  demoNotice: {
    color: C.muted,
    fontSize: 9,
    lineHeight: 14,
    textAlign: 'center',
    marginTop: 12,
  },

  authSwitch: {
    paddingVertical: 12,
    paddingHorizontal: 6,
  },

  authSwitchText: {
    color: C.green2,
    fontSize: 11,
    fontWeight: '800',
    textAlign: 'center',
  },

  stayButton: {
    width: '100%',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: C.line,
    borderRadius: 12,
    paddingVertical: 13,
    marginTop: 10,
  },

  stayButtonText: {
    color: C.green,
    fontSize: 12,
    fontWeight: '900',
  },

  profileMenu: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: C.white,
    padding: 14,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: C.line,
    marginBottom: 9,
  },

  profileMenuIcon: {
    fontSize: 22,
    marginRight: 12,
    width: 30,
    textAlign: 'center',
  },

  profileMenuTitle: {
    color: C.ink,
    fontSize: 12,
    fontWeight: '900',
  },

  profileMenuSubtitle: {
    color: C.muted,
    fontSize: 10,
    marginTop: 3,
  },

  settingsCard: {
    backgroundColor: C.white,
    borderRadius: 17,
    borderWidth: 1,
    borderColor: C.line,
    padding: 16,
    marginBottom: 12,
  },

  settingsTitle: {
    color: C.ink,
    fontSize: 18,
    fontWeight: '900',
  },

  settingsSubtitle: {
    color: C.muted,
    fontSize: 10,
    lineHeight: 15,
    marginTop: 5,
    marginBottom: 14,
  },

  settingsHeadingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },

  fieldLabel: {
    alignSelf: 'flex-start',
    color: C.ink,
    fontSize: 10,
    fontWeight: '800',
    marginBottom: 6,
  },

  multilineInput: {
    minHeight: 82,
    paddingTop: 12,
  },

  smallActionButton: {
    backgroundColor: C.green,
    borderRadius: 9,
    paddingHorizontal: 12,
    paddingVertical: 9,
    marginLeft: 8,
  },

  smallActionText: {
    color: C.white,
    fontSize: 10,
    fontWeight: '900',
  },

  settingsEmpty: {
    alignItems: 'center',
    backgroundColor: C.white,
    borderRadius: 17,
    borderWidth: 1,
    borderColor: C.line,
    padding: 20,
    marginBottom: 12,
  },

  addressCard: {
    backgroundColor: C.white,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: C.line,
    padding: 14,
    marginBottom: 10,
  },

  addressCardHeading: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },

  addressLabel: {
    color: C.ink,
    fontSize: 13,
    fontWeight: '900',
  },

  defaultBadge: {
    overflow: 'hidden',
    color: C.green,
    backgroundColor: C.mint,
    borderRadius: 6,
    fontSize: 8,
    fontWeight: '900',
    paddingHorizontal: 7,
    paddingVertical: 4,
  },

  addressText: {
    color: C.ink,
    fontSize: 11,
    lineHeight: 17,
  },

  addressSecondary: {
    color: C.muted,
    fontSize: 10,
    marginTop: 4,
  },

  addressActions: {
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: 18,
    borderTopWidth: 1,
    borderTopColor: C.line,
    paddingTop: 10,
    marginTop: 12,
  },

  addressActionText: {
    color: C.green2,
    fontSize: 10,
    fontWeight: '800',
  },

  deleteActionText: {
    color: '#B42318',
    fontSize: 10,
    fontWeight: '800',
  },

  rewardCard: {
    backgroundColor: C.green,
    borderRadius: 17,
    padding: 17,
    marginBottom: 12,
  },

  rewardEyebrow: {
    color: '#D9E8DC',
    fontSize: 9,
    fontWeight: '900',
    letterSpacing: 0.6,
  },

  rewardPoints: {
    color: C.white,
    fontSize: 25,
    fontWeight: '900',
    marginTop: 7,
  },

  rewardCaption: {
    color: '#D9E8DC',
    fontSize: 10,
    marginTop: 4,
  },

  offerCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: C.white,
    borderWidth: 1,
    borderColor: C.line,
    borderRadius: 15,
    padding: 12,
    marginBottom: 8,
  },

  offerCardIcon: {
    width: 42,
    height: 42,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFF4D6',
    borderRadius: 12,
    marginRight: 10,
  },

  offerCardCopy: {
    flex: 1,
  },

  offerCardTitle: {
    color: C.ink,
    fontSize: 11,
    fontWeight: '900',
  },

  offerCardDescription: {
    color: C.muted,
    fontSize: 9,
    marginTop: 3,
  },

  offerCode: {
    color: C.green,
    fontSize: 9,
    fontWeight: '900',
    letterSpacing: 0.6,
    marginTop: 5,
  },

  offerAppliedButton: {
    backgroundColor: C.green2,
  },

  supportBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: C.mint,
    borderRadius: 15,
    padding: 14,
    marginTop: 14,
    marginBottom: 12,
  },

  supportBannerIcon: {
    fontSize: 25,
    marginRight: 11,
  },

  supportBannerTitle: {
    color: C.green,
    fontSize: 12,
    fontWeight: '900',
  },

  supportBannerCopy: {
    color: C.green2,
    fontSize: 9,
    marginTop: 3,
  },

  faqCard: {
    backgroundColor: C.white,
    borderWidth: 1,
    borderColor: C.line,
    borderRadius: 13,
    paddingHorizontal: 13,
    paddingVertical: 12,
    marginBottom: 8,
  },

  faqQuestionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  faqQuestion: {
    flex: 1,
    color: C.ink,
    fontSize: 11,
    fontWeight: '800',
  },

  faqChevron: {
    color: C.green,
    fontSize: 18,
    fontWeight: '800',
    marginLeft: 8,
  },

  faqAnswer: {
    color: C.muted,
    fontSize: 10,
    lineHeight: 16,
    borderTopWidth: 1,
    borderTopColor: C.line,
    marginTop: 9,
    paddingTop: 9,
  },

  disabledButton: {
    opacity: 0.5,
  },

  supportSavedText: {
    color: C.green2,
    fontSize: 10,
    lineHeight: 15,
    fontWeight: '700',
    marginTop: 10,
  },

  chevron: {
    color: C.muted,
    fontSize: 25,
    marginLeft: 8,
  },

  profileFoot: {
    color: C.muted,
    fontSize: 9,
    textAlign: 'center',
    marginTop: 14,
    marginBottom: 10,
  },

  detailOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(12,24,16,0.55)',
    justifyContent: 'flex-end',
    zIndex: 20,
  },

  detailSheet: {
    backgroundColor: C.cream,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    overflow: 'hidden',
    maxHeight: '90%',
  },

  closeButton: {
    position: 'absolute',
    zIndex: 3,
    right: 14,
    top: 14,
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: C.white,
    alignItems: 'center',
    justifyContent: 'center',
  },

  detailImage: {
    width: '100%',
    height: 230,
    backgroundColor: '#EAE5D8',
  },

  detailContent: {
    padding: 20,
  },

  detailTag: {
    color: C.green2,
    fontSize: 10,
    fontWeight: '900',
  },

  imageCredit: {
    color: C.muted,
    fontSize: 9,
    textDecorationLine: 'underline',
    marginTop: 5,
  },

  detailName: {
    color: C.ink,
    fontSize: 23,
    fontWeight: '900',
    marginTop: 7,
  },

  detailEnglish: {
    color: C.muted,
    fontSize: 12,
    marginTop: 4,
  },

  detailCategory: {
    alignSelf: 'flex-start',
    color: C.green2,
    backgroundColor: C.mint,
    borderRadius: 8,
    fontSize: 10,
    fontWeight: '800',
    paddingHorizontal: 9,
    paddingVertical: 5,
    marginTop: 10,
  },

  detailPrice: {
    color: C.green,
    fontSize: 24,
    fontWeight: '900',
    marginTop: 14,
  },

  detailPer: {
    color: C.muted,
    fontSize: 11,
    fontWeight: '500',
  },

  detailDescription: {
    color: '#59645B',
    fontSize: 12,
    lineHeight: 19,
    marginTop: 10,
  },

  detailInfo: {
    color: C.green2,
    fontSize: 10,
    fontWeight: '800',
    marginTop: 14,
  },

  detailAdd: {
    backgroundColor: C.green,
    borderRadius: 13,
    alignItems: 'center',
    paddingVertical: 15,
    marginTop: 18,
  },

  detailAddText: {
    color: C.white,
    fontSize: 13,
    fontWeight: '900',
  },

  footer: {
    marginTop: 25,
    paddingVertical: 22,
    alignItems: 'center',
    backgroundColor: '#F0EEE4',
  },

  footerBrand: {
    color: C.green,
    fontSize: 15,
    fontWeight: '900',
  },

  footerText: {
    color: '#566458',
    fontSize: 10,
    marginTop: 5,
  },

  footerSmall: {
    color: '#969B92',
    fontSize: 9,
    marginTop: 7,
  },

  bottomNav: {
    height: 66,
    backgroundColor: C.white,
    borderTopWidth: 1,
    borderTopColor: C.line,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingBottom: 3,
  },

  navItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  navIconWrap: {
    minWidth: 48,
    height: 31,
    paddingHorizontal: 10,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },

  navIconWrapActive: {
    backgroundColor: C.mint,
  },

  navIcon: {
    fontSize: 22,
    color: '#788179',
  },

  navIconActive: {
    color: C.green,
  },

  navLabel: {
    fontSize: 9,
    color: '#818980',
    marginTop: 3,
    fontWeight: '700',
  },

  navLabelActive: {
    color: C.green,
    fontWeight: '900',
  },

  cartBadge: {
    position: 'absolute',
    right: 1,
    top: -2,
    backgroundColor: C.orange,
    minWidth: 16,
    height: 16,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: C.white,
  },

  cartBadgeText: {
    color: C.white,
    fontSize: 8,
    fontWeight: '900',
  },
});
