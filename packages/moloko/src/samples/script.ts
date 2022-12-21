export const script = `

var isLoggedIn = false

var Login = {
    view: function() {
        return m("form", [
            m("button[type=button]", {
                onclick: function() {
                    isLoggedIn = true
                    m.route.set("/secret")
                }
            }, "Login")
        ])
    }
}

m.route(document.body, "/secret", {
    "/secret": {
        onmatch: function() {
            if (!isLoggedIn) m.route.set("/login")
            else return Home
        }
    },
    "/login": Login
})

var Auth = {
    username: "",
    password: "",

    setUsername: function(value) {
        Auth.username = value
    },
    setPassword: function(value) {
        Auth.password = value
    },
    login: function() {
        m.request({
            url: "/api/v1/auth",
            params: {username: Auth.username, password: Auth.password}
        }).then(function(data) {
            localStorage.setItem("auth-token", data.token)
            m.route.set("/secret")
        })
    }
}

var Login = {
    view: function() {
        return m("form", [
            m("input[type=text]", {
                oninput: function (e) { Auth.setUsername(e.target.value) },
                value: Auth.username
            }),
            m("input[type=password]", {
                oninput: function (e) { Auth.setPassword(e.target.value) },
                value: Auth.password
            }),
            m("button[type=button]", {onclick: Auth.login}, "Login")
        ])
    }
}

m.route(document.body, "/secret", {
    "/secret": {
        onmatch: function() {
            if (!localStorage.getItem("auth-token")) m.route.set("/login")
            else return Home
        }
    },
    "/login": Login
})
`;
