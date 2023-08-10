class Session {
    set(id, value) {
        if (typeof (Storage) === 'undefined') {
            alert('Your browser does not support sessions!');
            return;
        }
        localStorage.setItem(id, JSON.stringify(value));
    }

    get(id) {
        if (typeof (Storage) === 'undefined') {
            alert('Your browser does not support sessions!');
            return;
        }
        let value = localStorage.getItem(id);
        return jQuery.parseJSON(value);
    }
}

//example
/*
const session = new Session();
session.set('name', [{first: 'Ahmed', last: 'Toumi'}, {price: '10000', name: 'hang nhap khau'}]);
session.get('name');
console.log(session.get('name'));*/
