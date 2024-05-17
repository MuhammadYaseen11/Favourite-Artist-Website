document.getElementById('submit').addEventListener('click', (e) => {
        e.preventDefault()
        const fname = document.getElementById('fname')
        const email = document.getElementById('email')
        re_name = /[a-zA-Z_\s\-\.]{6,32}/
        re_email = /([a-zA-Z_\d\.\-]+)@([a-zA-Z_\.\-]+)\.[a-zA-Z]{2,5}/
        if (!re_name.test(fname) || !re_email.test(email)) {
            alert('Please try again')
            location.reload()
        }
        const data = {
            "name": fname,
            "email": email
        }
        fetch("https://https://mudfoot.doc.stu.mmu.ac.uk/node/api/mailinglist", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        })
            .then(res => {
                if (res.status === 200)
                    return res.json()
                else if (res.status === 400)
                    throw ' "email" must be a valid email '

                else
                    throw res.statusText
            })
            
})
