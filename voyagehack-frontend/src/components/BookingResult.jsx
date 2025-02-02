const BookingResult = ({ packageName, probability }) => {
    return (
      <div className="mt-4 p-4 bg-green-100 rounded">
        <h3 className="text-lg font-bold text-green-600">Booking Probability</h3>
        <p>
          {packageName}: <strong>{probability * 100}%</strong>
        </p>
      </div>
    );
  };
  
  export default BookingResult;
  