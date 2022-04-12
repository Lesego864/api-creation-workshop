const addGarmentBtnElem = document.querySelector('.addGarmentBtn');
const hideAddGarmentBtnElem = document.querySelector('.hideAddGarmentBtn');
const addGarmentElem = document.querySelector('.add.garment');
const addGarmentButtonsElem = document.querySelector('.add.button');
const messageElem = document.querySelector('.message');

function viewMessage(value) {
    messageElem.innerHTML = value;
    messageElem.classList.toggle('hidden');

    setTimeout(() => {
        messageElem.innerHTML = '';
        messageElem.classList.toggle('hidden');
    }, 3000);
}

function toggleAddGarmetScreen() {
    addGarmentElem.classList.toggle('hidden');
}

hideAddGarmentBtnElem.addEventListener('click', function(evt) {
    toggleAddGarmetScreen()
});

const fieldManager = FieldManager({
    'description': '',
    'img': '',
    'season': '',
    'gender': '',
    'price': 0.00
});

addGarmentBtnElem.addEventListener('click', function(evt) {


    const fields = fieldManager.getValues();

    axios
        .post('/api/garments', fields)
        .then(result => {
            if (result.data.status == 'error') {
                viewMessage(result.data.message);
            } else {
                toggleAddGarmetScreen();
                //show success message from API
                viewMessage(result.data.message);
                fieldManager.clear();
                //show all the data
                filterData();
            }
        })
        .catch(err => {
            viewMessage(err.stack)
        });
});

addGarmentButtonsElem.addEventListener('click', function(evt) {
    evt.preventDefault();
    toggleAddGarmetScreen()
});