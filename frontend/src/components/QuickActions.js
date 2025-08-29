import React from 'react';
import { Box, Fab, Tooltip, Badge } from '@mui/material';
import { Favorite, History, LocalOffer, Help } from '@mui/icons-material';

const QuickActions = ({ favoriteCount, onFavoritesClick, onHistoryClick, onOffersClick, onHelpClick }) => {
  const actions = [
    { icon: <Favorite />, label: 'Favorites', count: favoriteCount, onClick: onFavoritesClick, color: 'error' },
    { icon: <History />, label: 'Order History', onClick: onHistoryClick, color: 'primary' },
    { icon: <LocalOffer />, label: 'Today\'s Offers', onClick: onOffersClick, color: 'success' },
    { icon: <Help />, label: 'Help & Support', onClick: onHelpClick, color: 'info' }
  ];

  return (
    <Box sx={{ position: 'fixed', right: 16, bottom: 100, display: 'flex', flexDirection: 'column', gap: 1 }}>
      {actions.map((action, index) => (
        <Tooltip key={index} title={action.label} placement="left">
          <Fab
            size="medium"
            color={action.color}
            onClick={action.onClick}
            sx={{ boxShadow: 3 }}
          >
            {action.count ? (
              <Badge badgeContent={action.count} color="error">
                {action.icon}
              </Badge>
            ) : (
              action.icon
            )}
          </Fab>
        </Tooltip>
      ))}
    </Box>
  );
};

export default QuickActions;