import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Grid, Card, CardContent, Typography, Button, Box, Badge, Fab, Dialog, DialogTitle, DialogContent, DialogActions, List, ListItem, ListItemText, Divider } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import FoodCategories from '../components/FoodCategories';
import SearchBar from '../components/SearchBar';
import { canteenAPI, orderAPI } from '../services/api';
import { CanteenBackground } from '../components/BackgroundStyles';
import { FoodImage } from '../components/ImagePlaceholders';
import { getMenuByCategory } from '../data/menuData';

const Menu = () => {
  const { canteenId } = useParams();
  const [canteens, setCanteens] = useState([]);
  const [selectedCanteen, setSelectedCanteen] = useState(canteenId || '1');
  const [menuItems, setMenuItems] = useState([]);
  const [category, setCategory] = useState('breakfast');
  const [cart, setCart] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [filteredItems, setFilteredItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilters, setActiveFilters] = useState([]);

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
      setCanteens(response.data.canteens);
    } catch (error) {
      console.error('Error fetching canteens:', error);
    }
  };

  const fetchMenu = async () => {
    setLoading(true);
    try {
      const items = getMenuByCategory(selectedCanteen, category);
      setMenuItems(items);
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

  const addToCart = (item) => {
    const existingItem = cart.find(cartItem => cartItem.id === item.id);
    if (existingItem) {
      setCart(cart.map(cartItem => 
        cartItem.id === item.id 
          ? { ...cartItem, quantity: cartItem.quantity + 1 }
          : cartItem
      ));
    } else {
      setCart([...cart, { ...item, quantity: 1 }]);
    }
  };

  const removeFromCart = (itemId) => {
    setCart(cart.filter(item => item.id !== itemId));
  };

  const updateQuantity = (itemId, quantity) => {
    if (quantity === 0) {
      removeFromCart(itemId);
    } else {
      setCart(cart.map(item => 
        item.id === itemId ? { ...item, quantity } : item
      ));
    }
  };

  const getTotalAmount = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const placeOrder = async () => {
    try {
      const orderData = {
        canteen_id: selectedCanteen,
        items: cart.map(item => ({
          menu_item_id: item.id,
          quantity: item.quantity
        })),
        pickup_time: new Date(Date.now() + 30 * 60000).toISOString(), // 30 minutes from now
        payment_method: 'digital'
      };

      await orderAPI.create(orderData);
      setCart([]);
      setCartOpen(false);
      alert('Order placed successfully!');
    } catch (error) {
      console.error('Error placing order:', error);
      alert('Failed to place order');
    }
  };

  return (
    <CanteenBackground>
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
        <Grid container spacing={3} justifyContent="center" sx={{ mt: 2 }}>
          {(filteredItems.length > 0 ? filteredItems : menuItems).map((item) => (
            <Grid item xs={12} sm={6} md={4} lg={2.4} xl={2.4} key={item.id}>
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
                  {/* Food Image */}
                  <Box sx={{ display: 'flex', justifyContent: 'center', mb: { xs: 1, md: 2 } }}>
                    <FoodImage category={category} size={{ xs: 80, sm: 100, md: 120 }} />
                  </Box>
                  
                  {/* Item Header */}
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                    <Typography 
                      variant="h6" 
                      sx={{ 
                        fontWeight: 'bold',
                        fontSize: { xs: '1rem', md: '1.1rem' },
                        lineHeight: 1.2,
                        flex: 1
                      }}
                    >
                      {item.name}
                    </Typography>
                    <Typography variant="h4" sx={{ ml: 1, fontSize: { xs: '1.5rem', md: '2rem' } }}>
                      {category === 'stationery' ? '📚' : '🍽️'}
                    </Typography>
                  </Box>
                  
                  {/* Tamil Name */}
                  {item.name_tamil && (
                    <Typography 
                      variant="body2" 
                      color="text.secondary" 
                      sx={{ 
                        fontStyle: 'italic', 
                        mb: { xs: 1, md: 2 },
                        fontSize: { xs: '0.8rem', md: '0.9rem' },
                        lineHeight: 1.3
                      }}
                    >
                      {item.name_tamil}
                    </Typography>
                  )}
                  
                  {/* Description */}
                  <Typography 
                    variant="body2" 
                    sx={{ 
                      mb: { xs: 2, md: 3 }, 
                      minHeight: { xs: 36, md: 48 },
                      color: 'text.secondary',
                      lineHeight: 1.4,
                      fontSize: { xs: '0.85rem', md: '0.875rem' }
                    }}
                  >
                    {item.description}
                  </Typography>
                  
                  {/* Price and Rating */}
                  <Box sx={{ 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    alignItems: 'center', 
                    mb: 2,
                    p: 1,
                    bgcolor: '#f8fafc',
                    borderRadius: 1
                  }}>
                    <Typography 
                      variant="h6" 
                      color="primary" 
                      sx={{ 
                        fontWeight: 'bold',
                        fontSize: { xs: '1rem', md: '1.2rem' }
                      }}
                    >
                      Rs. {item.price.toLocaleString()}
                    </Typography>
                    <Box sx={{ 
                      display: 'flex', 
                      alignItems: 'center', 
                      gap: 0.5,
                      bgcolor: '#abff4f',
                      px: 1,
                      py: 0.5,
                      borderRadius: 1
                    }}>
                      <Typography variant="body2">⭐</Typography>
                      <Typography variant="body2" fontWeight="bold">
                        {item.rating}
                      </Typography>
                    </Box>
                  </Box>
                  
                  {/* Order Button */}
                  <Button
                    variant="contained"
                    fullWidth
                    size="large"
                    sx={{ 
                      mt: 'auto',
                      py: 1.5,
                      fontWeight: 'bold',
                      fontSize: '1rem',
                      borderRadius: 2,
                      textTransform: 'none',
                      boxShadow: 2,
                      '&:hover': {
                        boxShadow: 4,
                        transform: 'translateY(-1px)'
                      }
                    }}
                    onClick={() => addToCart(item)}
                  >
                    {category === 'stationery' ? '🛍️ Add to Cart' : '🍽️ Order Now'}
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}

      <Fab
        color="primary"
        sx={{ position: 'fixed', bottom: 16, right: 16 }}
        onClick={() => setCartOpen(true)}
      >
        <Badge badgeContent={cart.length} color="error">
          <ShoppingCartIcon />
        </Badge>
      </Fab>

      <Dialog open={cartOpen} onClose={() => setCartOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Your Cart</DialogTitle>
        <DialogContent>
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
            <Button variant="contained" onClick={placeOrder}>
              Place Order
            </Button>
          )}
        </DialogActions>
      </Dialog>
      </Container>
    </CanteenBackground>
  );
};

export default Menu;