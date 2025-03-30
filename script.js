document.addEventListener('DOMContentLoaded', function() {
    const radioButtons = document.querySelectorAll('input[type="radio"]');
    const priceContainers = document.querySelectorAll('.price-container-radio');
    const totalPrice = document.querySelector('.helper-text h5');
    
    // Standard prices for each unit
    const standardPrices = {
        '1U': 11.00,  // Standard price for 1 unit
        '2U': 24.00,  // Standard price for 2 units
        '3U': 39.00   // Standard price for 3 units
    };
    
    // Discount percentages
    const discounts = {
        '1U': 0.10, // 10% off
        '2U': 0.20, // 20% off
        '3U': 0.30  // 30% off
    };

    // Function to calculate price with discount
    function calculatePrice(units) {
        const discount = discounts[units];
        const standardPrice = standardPrices[units];
        const discountedPrice = standardPrice * (1 - discount);
        return discountedPrice.toFixed(2);
    }

    // Function to update total price display
    function updateTotalPrice(selectedRadio) {
        const price = calculatePrice(selectedRadio.id);
        totalPrice.textContent = `Total: $${price} USD`;
    }

    // Function to show/hide selection groups and size-color headers
    function toggleSelectionGroups(selectedContainer) {
        // Hide all selection groups and size-color headers first
        document.querySelectorAll('.selection-group, .size-color').forEach(group => {
            group.classList.remove('show');
        });

        // Show selection group and size-color header for the selected container
        const selectedGroup = selectedContainer.querySelector('.selection-group');
        const selectedSizeColor = selectedContainer.querySelector('.size-color');
        if (selectedGroup && selectedSizeColor) {
            selectedGroup.classList.add('show');
            selectedSizeColor.classList.add('show');
        }
    }

    // Add click event listeners to radio buttons
    radioButtons.forEach(radio => {
        radio.addEventListener('change', function() {
            // Remove selected class from all containers
            priceContainers.forEach(container => {
                container.classList.remove('selected');
            });
            
            // Get the container of the clicked radio button
            const selectedContainer = this.closest('.price-container-radio');
            
            // Add selected class to the clicked container
            selectedContainer.classList.add('selected');
            
            // Toggle selection groups and size-color headers
            toggleSelectionGroups(selectedContainer);
            
            // Update the total price
            updateTotalPrice(this);
        });
    });

    // Initialize with the first radio button selected
    const firstRadio = radioButtons[0];
    firstRadio.checked = true;
    const firstContainer = firstRadio.closest('.price-container-radio');
    firstContainer.classList.add('selected');
    toggleSelectionGroups(firstContainer);
    updateTotalPrice(firstRadio);
});
