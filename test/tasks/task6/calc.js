const quantityInput = document.getElementById('quantity');
const serviceTypeRadio = document.querySelectorAll('input[name="serviceType"]');
        const optionSelect = document.getElementById('optionSelect');
        const optionSelectInput = document.getElementById('selector');
        const propertyCheckbox = document.getElementById('propertyCheckbox');
        const propertyCheckboxInput = document.getElementById('property');
        const totalPriceDisplay = document.getElementById('totalPrice');
        const prices = {
            type1: 15929,
            type2: 24990,
            type3: 11999,
            option1: 500,
            option2: 1000,
            property1: 400,
        };

        function updateTotalPrice() {
            const quantity = parseInt(quantityInput.value);
            let totalPrice = 0;

            // Получаем выбранный тип услуги
            let selectedServiceType = null;
            serviceTypeRadio.forEach((radio) => {
                if (radio.checked) {
                    selectedServiceType = radio.value;
                }
            });

            // Добавляем стоимость выбранного типа услуги
            if (selectedServiceType) {
                totalPrice += prices[selectedServiceType];
            }

            // Добавляем стоимость опции, если выбрана
            if (optionSelect.style.display !== 'none') {
                const selectedOption = optionSelectInput.value;
                totalPrice += prices[selectedOption] || 0;
            }

            // Добавляем стоимость свойства товара, если выбрано
            if (propertyCheckbox.style.display !== 'none' && propertyCheckboxInput.checked) {
                totalPrice += prices[propertyCheckboxInput.value] || 0;
            }

            // Умножаем на количество
            totalPrice *= quantity;

            // Обновляем отображение итоговой стоимости
            totalPriceDisplay.textContent = `Итоговая стоимость: ${totalPrice}₽`;
        }

        // Добавляем обработчики для выбора типа услуги
        serviceTypeRadio.forEach((radio) => {
            radio.addEventListener('change', () => {
                const selectedServiceType = radio.value;

                if (selectedServiceType === 'type1') {
                    optionSelect.style.display = 'none';
                    propertyCheckbox.style.display = 'none';
                } else if (selectedServiceType === 'type2') {
                    optionSelect.style.display = 'block';
                    propertyCheckbox.style.display = 'none';
                } else if (selectedServiceType === 'type3') {
                    optionSelect.style.display = 'none';
                    propertyCheckbox.style.display = 'block';
                }

                // Обновляем итоговую стоимость
                updateTotalPrice();
            });
        });

        // Добавляем обработчики для изменения элементов формы
        quantityInput.addEventListener('input', updateTotalPrice);
        optionSelectInput.addEventListener('change', updateTotalPrice);
        propertyCheckboxInput.addEventListener('change', updateTotalPrice);

        // Инициализируем итоговую стоимость
        updateTotalPrice();