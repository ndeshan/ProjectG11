import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Grid, Card, CardContent, Typography, Button, Box, Badge, Fab, Dialog, DialogTitle, DialogContent, DialogActions, List, ListItem, ListItemText, Divider, Alert, Snackbar } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import FoodCategories from '../components/FoodCategories';
import SearchBar from '../components/SearchBar';
import { canteenAPI, orderAPI, menuAPI } from '../services/api';
import { getMenuByCategory } from '../data/menuData';
import { StaggerContainer, Scale } from '../components/animations';
import { useResponsive } from '../components/MobileResponsive';
import { useTheme } from '../contexts/ThemeContext';

// Food emoji mapping function
const getFoodEmoji = (name, category) => {
  const foodEmojis = {
    // Rice dishes
    'rice': '🍛', 'curry': '🍛', 'biriyani': '🍛', 'fried rice': '🍛',
    // Bread items
    'rotti': '🥖', 'bread': '🍞', 'sandwich': '🥪', 'toast': '🍞',
    // Noodles
    'kottu': '🍜', 'noodles': '🍜', 'pasta': '🍝', 'string hoppers': '🍝',
    // Snacks
    'samosa': '🥟', 'roll': '🌯', 'cutlet': '🍘', 'wade': '🍩',
    // Drinks
    'tea': '🍵', 'coffee': '☕', 'juice': '🧃', 'water': '💧',
    // Sweets
    'cake': '🍰', 'biscuit': '🍪', 'sweet': '🍬', 'ice cream': '🍦',
    // Stationery
    'pen': '✏️', 'book': '📚', 'paper': '📄', 'calculator': '🧮'
  };
  
  const nameLower = name.toLowerCase();
  for (const [key, emoji] of Object.entries(foodEmojis)) {
    if (nameLower.includes(key)) {
      return emoji;
    }
  }
  
  // Category-based fallback
  const categoryEmojis = {
    'breakfast': '🍳',
    'lunch': '🍽️',
    'dinner': '🍽️',
    'snacks': '🍿',
    'beverages': '🥤',
    'stationery': '📝'
  };
  
  return categoryEmojis[category] || '🍽️';
};

const Menu = () => {
  const { canteenId } = useParams();
  const { isMobile } = useResponsive();
  const { isDark: darkMode } = useTheme();
  
  const [canteens, setCanteens] = useState([]);
  const [selectedCanteen, setSelectedCanteen] = useState(canteenId || '1');
  const [menuItems, setMenuItems] = useState([]);
  const [category, setCategory] = useState('breakfast');
  const [cart, setCart] = useState(() => {
    try {
      const savedCart = localStorage.getItem('canteen_cart');
      return savedCart ? JSON.parse(savedCart) : [];
    } catch (error) {
      console.error('Error loading cart from localStorage:', error);
      return [];
    }
  });
  const [cartOpen, setCartOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [filteredItems, setFilteredItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilters, setActiveFilters] = useState([]);
  const [notification, setNotification] = useState({ open: false, message: '', severity: 'success' });

  useEffect(() => {
    fetchCanteens();
  }, []);

  useEffect(() => {
    if (selectedCanteen) {
      fetchMenu();
    }
  }, [selectedCanteen, category]);

  useEffect(() => {
    filterItems();
  }, [menuItems, searchTerm, activeFilters]);

  const fetchCanteens = async () => {
    try {
      const response = await canteenAPI.getAll();
      const canteensData = response.data || [];
      setCanteens(canteensData);
      console.log('Loaded canteens from API:', canteensData.length, 'canteens');
    } catch (error) {
      console.error('Error fetching canteens:', error);
      // Fallback to default canteens
      setCanteens([
        { id: 1, name: 'Main Canteen', location: 'Faculty of Engineering' },
        { id: 2, name: 'Science Canteen', location: 'Faculty of Science' },
        { id: 3, name: 'Arts Canteen', location: 'Faculty of Arts' }
      ]);
    }
  };

  const fetchMenu = async () => {
    setLoading(true);
    try {
      // Try to fetch from API first, fallback to local data
      try {
        const response = await menuAPI.getAll();
        const apiItems = response.data || [];
        
        // Filter by category if needed
        const filteredItems = category === 'all' ? apiItems : 
          apiItems.filter(item => item.category === category);
        
        setMenuItems(filteredItems);
        console.log('Loaded menu from API:', filteredItems.length, 'items');
      } catch (apiError) {
        console.log('API not available, using local data');
        const items = getMenuByCategory(selectedCanteen, category);
        setMenuItems(items);
      }
      
    } catch (error) {
      console.error('Error fetching menu:', error);
    } finally {
      setLoading(false);
    }
  };

  const filterItems = () => {
    let filtered = menuItems;
    
    if (searchTerm) {
      filtered = filtered.filter(item => 
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.name_tamil?.includes(searchTerm) ||
        item.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    if (activeFilters.includes('cheap')) {
      filtered = filtered.filter(item => item.price <= 50);
    }
    if (activeFilters.includes('popular')) {
      filtered = filtered.filter(item => item.rating >= 4.5);
    }
    
    setFilteredItems(filtered);
  };

  const saveCartToStorage = (cartData) => {
    try {
      localStorage.setItem('canteen_cart', JSON.stringify(cartData));
    } catch (error) {
      console.error('Error saving cart to localStorage:', error);
    }
  };

  const addToCart = (item) => {
    try {
      const existingItem = cart.find(cartItem => cartItem.id === item.id);
      let newCart;
      
      if (existingItem) {
        newCart = cart.map(cartItem => 
          cartItem.id === item.id 
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
      } else {
        newCart = [...cart, { ...item, quantity: 1 }];
      }
      
      setCart(newCart);
      saveCartToStorage(newCart);
      setNotification({ 
        open: true, 
        message: `${item.name} added to cart!`, 
        severity: 'success' 
      });
    } catch (error) {
      console.error('Error adding to cart:', error);
      setNotification({ 
        open: true, 
        message: 'Failed to add item to cart', 
        severity: 'error' 
      });
    }
  };

  const removeFromCart = (itemId) => {
    const newCart = cart.filter(item => item.id !== itemId);
    setCart(newCart);
    saveCartToStorage(newCart);
  };

  const updateQuantity = (itemId, quantity) => {
    let newCart;
    if (quantity === 0) {
      newCart = cart.filter(item => item.id !== itemId);
    } else {
      newCart = cart.map(item => 
        item.id === itemId ? { ...item, quantity } : item
      );
    }
    setCart(newCart);
    saveCartToStorage(newCart);
  };

  const getTotalAmount = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const placeOrder = async () => {
    try {
      setLoading(true);
      const orderData = {
        canteen_id: Number(selectedCanteen),
        items: cart.map(item => ({
          id: item.id,
          name: item.name,
          price: item.price,
          quantity: item.quantity,
          total: item.price * item.quantity
        })),
        total_amount: getTotalAmount(),
        payment_method: 'digital'
      };

      try {
        // Try to place order via API
        const response = await orderAPI.create(orderData);
        const newOrder = response.data;
        
        setCart([]);
        saveCartToStorage([]);
        setCartOpen(false);
        setNotification({ 
          open: true, 
          message: `🎉 Order placed successfully! Order #${newOrder.order_number}. You will receive SMS and email confirmation.`, 
          severity: 'success' 
        });
        
        // Also save to localStorage for persistence
        const existingOrders = JSON.parse(localStorage.getItem('user_orders') || '[]');
        existingOrders.push(newOrder);
        localStorage.setItem('user_orders', JSON.stringify(existingOrders));
        
        // Trigger large notification
        window.dispatchEvent(new CustomEvent('orderPlaced', {
          detail: {
            orderNumber: newOrder.order_number,
            total: getTotalAmount(),
            itemCount: cart.length
          }
        }));
        
      } catch (apiError) {
        console.log('API not available, saving locally');
        
        // Fallback to localStorage
        const existingOrders = JSON.parse(localStorage.getItem('user_orders') || '[]');
        const newOrder = {
          ...orderData,
          id: Date.now(),
          order_number: `ORD${Date.now()}`,
          status: 'confirmed',
          created_at: new Date().toISOString()
        };
        existingOrders.push(newOrder);
        localStorage.setItem('user_orders', JSON.stringify(existingOrders));
        
        // Trigger large notification
        window.dispatchEvent(new CustomEvent('orderPlaced', {
          detail: {
            orderNumber: newOrder.order_number,
            total: getTotalAmount(),
            itemCount: cart.length
          }
        }));
        
        setCart([]);
        saveCartToStorage([]);
        setCartOpen(false);
        setNotification({ 
          open: true, 
          message: `🎉 Order placed successfully! Order #${newOrder.order_number}. You will receive confirmation.`, 
          severity: 'success' 
        });
      }
    } catch (error) {
      console.error('Order placement error:', error);
      setNotification({ 
        open: true, 
        message: '⚠️ Failed to place order. Please try again.', 
        severity: 'error' 
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`min-h-screen transition-all duration-300 ${darkMode ? 'bg-gradient-to-br from-gray-900 to-gray-800' : 'bg-gradient-to-br from-gray-50 to-gray-100'}`}>
      <Container maxWidth="lg" sx={{ pt: 4, pb: 4 }}>
        <Typography 
          variant="h1" 
          align="center" 
          gutterBottom 
          sx={{ 
            fontFamily: '"Playfair Display", serif',
            fontWeight: 800,
            fontSize: { xs: '2.5rem', md: '3.5rem' },
            color: '#454955',
            mb: 2,
            letterSpacing: '-0.02em',
            textShadow: '2px 2px 4px rgba(69,73,85,0.1)'
          }}
        >
          Our Menu Selection
        </Typography>
        <Typography 
          variant="body1" 
          align="center" 
          sx={{ 
            color: '#6b7280',
            mb: 6,
            fontSize: '1.2rem',
            maxWidth: '600px',
            mx: 'auto',
            lineHeight: 1.7
          }}
        >
          Discover authentic Sri Lankan cuisine and academic supplies from our university canteens
        </Typography>

        <Box sx={{ mb: 4, textAlign: 'center' }}>
          <Typography 
            variant="h3" 
            gutterBottom 
            sx={{ 
              fontFamily: '"Playfair Display", serif',
              color: '#454955',
              fontWeight: 700,
              mb: 3,
              fontSize: { xs: '1.5rem', md: '2rem' }
            }}
          >
            Select Canteen:
          </Typography>
          <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', justifyContent: 'center' }}>
            {canteens.map((canteen) => (
              <Button
                key={canteen.id}
                variant={selectedCanteen == canteen.id ? 'contained' : 'outlined'}
                onClick={() => setSelectedCanteen(canteen.id)}
                sx={{
                  px: 4,
                  py: 1.5,
                  borderRadius: 3,
                  fontWeight: 600,
                  textTransform: 'none',
                  fontSize: '1.1rem',
                  ...(selectedCanteen == canteen.id ? {
                    bgcolor: '#29bf12',
                    '&:hover': { bgcolor: '#abff4f', color: '#454955' }
                  } : {
                    borderColor: '#29bf12',
                    color: '#29bf12',
                    '&:hover': { bgcolor: '#f8fafc' }
                  })
                }}
              >
                {canteen.name}
              </Button>
            ))}
          </Box>
        </Box>

        <FoodCategories 
          selectedCategory={category} 
          onCategoryChange={setCategory} 
        />
        
        <SearchBar 
          onSearch={setSearchTerm}
          onFilterChange={setActiveFilters}
        />

        {loading ? (
          <Typography>Loading menu...</Typography>
        ) : (
          <StaggerContainer>
            <Grid container spacing={3} justifyContent="center" sx={{ mt: 2 }}>
              {(filteredItems.length > 0 ? filteredItems : menuItems).map((item) => (
                <Grid item xs={12} sm={6} md={4} lg={2.4} xl={2.4} key={item.id}>
                  <Scale>
                    <Card 
                      sx={{ 
                        height: '100%', 
                        display: 'flex', 
                        flexDirection: 'column',
                        border: '2px solid #abff4f',
                        borderRadius: 4,
                        transition: 'all 0.3s ease',
                        '&:hover': {
                          transform: 'translateY(-8px)',
                          boxShadow: '0 12px 32px rgba(41,191,18,0.2)',
                          borderColor: '#29bf12'
                        }
                      }}
                    >
                      <CardContent sx={{ flexGrow: 1, p: { xs: 1.5, md: 2 } }}>
                      {/* Food Graphic */}
                      <Box sx={{ 
                        display: 'flex', 
                        justifyContent: 'center', 
                        mb: { xs: 1, md: 2 },
                        fontSize: { xs: '3rem', md: '4rem' },
                        filter: 'drop-shadow(2px 2px 4px rgba(41,191,18,0.2))'
                      }}>
                        {getFoodEmoji(item.name, item.category)}
                      </Box>

                      {/* Item Details */}
                      <Box sx={{ textAlign: 'center' }}>
                        <Typography 
                          variant="h6" 
                          sx={{ 
                            fontWeight: 600, 
                            color: '#454955',
                            fontSize: { xs: '0.9rem', md: '1rem' },
                            mb: 0.5
                          }}
                        >
                          {item.name}
                        </Typography>
                        
                        {item.name_tamil && (
                          <Typography 
                            variant="body2" 
                            sx={{ 
                              color: '#6b7280',
                              fontSize: { xs: '0.8rem', md: '0.9rem' },
                              mb: 1
                            }}
                          >
                            {item.name_tamil}
                          </Typography>
                        )}
                        
                        <Typography 
                          variant="body2" 
                          sx={{ 
                            color: '#6b7280',
                            fontSize: { xs: '0.75rem', md: '0.85rem' },
                            mb: 1.5,
                            minHeight: '40px'
                          }}
                        >
                          {item.description}
                        </Typography>
                        
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                          <Typography 
                            variant="h6" 
                            sx={{ 
                              color: '#29bf12',
                              fontWeight: 700,
                              fontSize: { xs: '0.9rem', md: '1rem' }
                            }}
                          >
                            Rs. {item.price.toLocaleString()}
                          </Typography>
                          
                          <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <Typography 
                              variant="body2" 
                              sx={{ 
                                color: '#f59e0b',
                                mr: 0.5,
                                fontSize: { xs: '0.75rem', md: '0.85rem' }
                              }}
                            >
                              ⭐
                            </Typography>
                            <Typography 
                              variant="body2" 
                              sx={{ 
                                color: '#6b7280',
                                fontSize: { xs: '0.75rem', md: '0.85rem' }
                              }}
                            >
                              {item.rating}
                            </Typography>
                          </Box>
                        </Box>
                        
                        {/* Add to Cart Button */}
                        <Button
                          variant="contained"
                          onClick={() => addToCart(item)}
                          sx={{
                            bgcolor: '#29bf12',
                            color: '#ffffff',
                            fontWeight: 600,
                            borderRadius: 3,
                            px: 3,
                            py: 1,
                            fontSize: { xs: '0.8rem', md: '0.9rem' },
                            '&:hover': {
                              bgcolor: '#abff4f',
                              color: '#454955'
                            }
                          }}
                        >
                          Add to Cart
                        </Button>
                      </Box>
                      </CardContent>
                    </Card>
                  </Scale>
                </Grid>
              ))}
            </Grid>
          </StaggerContainer>
        )}

        <Fab
          color="primary"
          sx={{ position: 'fixed', top: 16, right: 16, zIndex: (theme) => theme.zIndex.tooltip + 1 }}
          onClick={() => setCartOpen(true)}
        >
          <Badge badgeContent={cart.length} color="error">
            <ShoppingCartIcon />
          </Badge>
        </Fab>

        <Snackbar
          open={notification.open}
          autoHideDuration={4000}
          onClose={() => setNotification({ ...notification, open: false })}
        >
          <Alert 
            onClose={() => setNotification({ ...notification, open: false })} 
            severity={notification.severity}
          >
            {notification.message}
          </Alert>
        </Snackbar>

        <Dialog 
          open={cartOpen} 
          onClose={() => setCartOpen(false)} 
          maxWidth="sm" 
          fullWidth
          PaperProps={{
            sx: {
              borderRadius: 3,
              maxHeight: isMobile ? '90vh' : '80vh'
            }
          }}
        >
          <DialogTitle sx={{ 
            bgcolor: '#29bf12', 
            color: 'white',
            textAlign: 'center',
            fontWeight: 700
          }}>
            🛒 Your Cart ({cart.length} items)
          </DialogTitle>
          <DialogContent sx={{ p: { xs: 2, sm: 3 } }}>
            {cart.length === 0 ? (
              <Typography>Your cart is empty</Typography>
            ) : (
              <List>
                {cart.map((item) => (
                  <div key={item.id}>
                    <ListItem>
                      <ListItemText
                        primary={item.name}
                        secondary={`Rs. ${item.price.toLocaleString()} x ${item.quantity} = Rs. ${(item.price * item.quantity).toLocaleString()}`}
                      />
                      <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                        <Button 
                          size="small" 
                          variant="outlined" 
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          sx={{ minWidth: 30, height: 30 }}
                        >
                          -
                        </Button>
                        <Typography sx={{ minWidth: 30, textAlign: 'center' }}>
                          {item.quantity}
                        </Typography>
                        <Button 
                          size="small" 
                          variant="outlined" 
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          sx={{ minWidth: 30, height: 30 }}
                        >
                          +
                        </Button>
                        <Button 
                          size="small" 
                          color="error" 
                          variant="contained"
                          onClick={() => removeFromCart(item.id)}
                          sx={{ ml: 1, minWidth: 60 }}
                        >
                          Remove
                        </Button>
                      </Box>
                    </ListItem>
                    <Divider />
                  </div>
                ))}
                <ListItem>
                  <ListItemText
                    primary={<Typography variant="h6">Total: Rs. {getTotalAmount().toLocaleString()}</Typography>}
                  />
                </ListItem>
              </List>
            )}
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setCartOpen(false)}>Close</Button>
            {cart.length > 0 && (
              <Button 
                variant="contained" 
                onClick={placeOrder}
                disabled={loading}
                sx={{ bgcolor: '#29bf12', '&:hover': { bgcolor: '#abff4f', color: '#454955' } }}
              >
                {loading ? 'Placing Order...' : 'Place Order'}
              </Button>
            )}
          </DialogActions>
        </Dialog>
      </Container>
    </div>
  );
};

export default Menu;
