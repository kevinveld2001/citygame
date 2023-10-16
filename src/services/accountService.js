

export async function anonymousLogin() {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const anonymousUserCridentionals = await fetch("https://api.toto.io/v2/auth/try", {
        method: 'POST',
        headers: myHeaders,
        body: JSON.stringify({
            "lang": "eng",
            "screenName": "hallo"
        })
    })
    .then(response => response.json())
    .catch(error => console.log('error', error));
    
   console.log(anonymousUserCridentionals);
}

export async function login(email, password) {
    
}