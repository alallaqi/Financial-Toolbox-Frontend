import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import MortgageCalculator from '../components/MortgageCalculator'; // Assuming this component exists
import Header from '../components/Header'; // Import the Header component
import NavbarComponent from '../components/NavbarComponent'; // Import the Navbar component
import ProtectedRoute from '../components/ProtectedRoute';

const CalculationsPage = () => {
  const router = useRouter();
  const { tool } = router.query;

  useEffect(() => {
    console.log(`Loaded calculator for: ${tool}`);
  }, [tool]);

  const renderCalculator = () => {
    switch(tool) {
      case 'mortgage':
        return <MortgageCalculator />;
      // Add other cases for different calculators as needed
      default:
        return <p>Select a tool to see the calculator.</p>;
    }
  };

  return (
    <div>
          <ProtectedRoute >
        <NavbarComponent />  {/* Include the NavbarComponent under the header */}
      <Header />  {/* Include the Header at the top of the page */}
      </ProtectedRoute>
      <h1>Calculator</h1>
      {renderCalculator()}
    </div>
  );
};

export default CalculationsPage;
