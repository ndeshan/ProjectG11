import React, { useState, useEffect } from 'react';
import { Box, Skeleton } from '@mui/material';

// Lazy loading image component
export const LazyImage = ({ src, alt, width, height, fallback = '/images/food-placeholder.jpg', ...props }) => {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    const element = document.getElementById(`lazy-${src}`);
    if (element) observer.observe(element);

    return () => observer.disconnect();
  }, [src]);

  const handleLoad = () => setLoaded(true);
  const handleError = () => setError(true);

  return (
    <Box
      id={`lazy-${src}`}
      sx={{
        width: width || '100%',
        height: height || 'auto',
        position: 'relative',
        overflow: 'hidden',
        borderRadius: 2
      }}
      {...props}
    >
      {!loaded && !error && (
        <Skeleton
          variant="rectangular"
          width="100%"
          height={height || 200}
          animation="wave"
        />
      )}
      
      {inView && (
        <img
          src={error ? fallback : src}
          alt={alt}
          onLoad={handleLoad}
          onError={handleError}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            display: loaded || error ? 'block' : 'none',
            transition: 'opacity 0.3s ease'
          }}
        />
      )}
    </Box>
  );
};

// Optimized menu item image
export const MenuItemImage = ({ item, size = 'medium' }) => {
  const sizes = {
    small: { width: 80, height: 80 },
    medium: { width: 120, height: 120 },
    large: { width: 200, height: 200 }
  };

  const getImageUrl = (item) => {
    if (item.image_url) return item.image_url;
    
    // Generate image based on category
    const categoryImages = {
      breakfast: '/images/1.jpg',
      lunch: '/images/2.jpg',
      dinner: '/images/3.jpg',
      stationery: '/images/4.jpg'
    };
    
    return categoryImages[item.category] || '/images/food-placeholder.jpg';
  };

  return (
    <LazyImage
      src={getImageUrl(item)}
      alt={item.name}
      width={sizes[size].width}
      height={sizes[size].height}
      sx={{
        borderRadius: 2,
        boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
        border: '2px solid #f0f0f0',
        '&:hover': {
          borderColor: '#29bf12',
          transform: 'scale(1.02)',
          transition: 'all 0.3s ease'
        }
      }}
    />
  );
};

// Image upload component for admin
export const ImageUpload = ({ onImageSelect, currentImage }) => {
  const [preview, setPreview] = useState(currentImage);
  const [uploading, setUploading] = useState(false);

  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    if (file) {
      setUploading(true);
      
      // Create preview
      const reader = new FileReader();
      reader.onload = (e) => {
        setPreview(e.target.result);
        setUploading(false);
        onImageSelect(file, e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <Box sx={{ textAlign: 'center' }}>
      <input
        type="file"
        accept="image/*"
        onChange={handleFileSelect}
        style={{ display: 'none' }}
        id="image-upload"
      />
      <label htmlFor="image-upload">
        <Box
          sx={{
            width: 200,
            height: 200,
            border: '2px dashed #ccc',
            borderRadius: 2,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            mx: 'auto',
            mb: 2,
            '&:hover': { borderColor: '#29bf12' }
          }}
        >
          {uploading ? (
            <Skeleton width={200} height={200} />
          ) : preview ? (
            <img
              src={preview}
              alt="Preview"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                borderRadius: 8
              }}
            />
          ) : (
            <Box sx={{ textAlign: 'center', color: '#666' }}>
              📷<br />Click to upload
            </Box>
          )}
        </Box>
      </label>
    </Box>
  );
};

export default { LazyImage, MenuItemImage, ImageUpload };