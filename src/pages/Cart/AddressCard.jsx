import { Button, Card, useTheme } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import { useThemeContext } from '../../Theme/ThemeContext';

function AddressCard({ address, showButton, handleSelectAddress }) {
  const { mode } = useThemeContext();
  const theme = useTheme();

  // Determine Tailwind classes based on mode
  const cardClasses = `flex gap-5 w-64 p-5 ${
    mode === "dark" ? "bg-gray-800 text-white" : "bg-gray-200 text-black"
  }`;

  return (
    <Card className={cardClasses}>
      <HomeIcon />
      <div className='space-y-3'>
        <h1 className='font-semibold text-lg'>{address.streetAddress}</h1> {/* Display street address */}
        <p>{address.city}, {address.state}, {address.pincode}</p> {/* Display city, state, and pincode */}
        {showButton && (
          <Button
            variant='contained'
            style={{ backgroundColor: theme.palette.secondary.main }}
            fullWidth
            onClick={handleSelectAddress}
          >
            Select
          </Button>
        )}
      </div>
    </Card>
  );
}

export default AddressCard;
