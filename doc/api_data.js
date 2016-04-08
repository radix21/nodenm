define({ "api": [
  {
    "type": "post",
    "url": "/api/account/register",
    "title": "Register",
    "name": "Register",
    "description": "<p>Allows register a user on platform</p>",
    "group": "account",
    "version": "0.1.0",
    "success": {
      "examples": [
        {
          "title": "success-response:",
          "content": "HTTP/1.1 200 OK\n{\n    \"status\" : ok\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Missing parameters",
          "content": "HTTP/1.1 400 ERROR\n{\n    \"status\" : \"failed\",\n    \"message\" : \"Bad Request\"\n}",
          "type": "json"
        },
        {
          "title": "username or email already taken",
          "content": "HTTP/1.1 400 ERROR\n{\n    \"status\" : \"failed\",\n    \"message\" : \"username or email already taken\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "./apps/account.js",
    "groupTitle": "account"
  },
  {
    "type": "post",
    "url": "/api/account/login",
    "title": "Login",
    "name": "login",
    "description": "<p>Request for authentication</p>",
    "group": "account",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "username",
            "description": "<p>Name of the user</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>Password of the user</p>"
          }
        ]
      }
    },
    "version": "0.1.0",
    "success": {
      "examples": [
        {
          "title": "success-response:",
          "content": "HTTP/1.1 200 OK\n{\n    \"status\" : ok\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "AuthenticationFailed:",
          "content": "HTTP/1.1 200 OK\n{\n    \"status\" : \"failed\",\n    \"message\" : \"username and/or passowrd are incorrect\"\n\n}",
          "type": "Object"
        }
      ]
    },
    "filename": "./apps/account.js",
    "groupTitle": "account"
  },
  {
    "type": "get",
    "url": "/account/login",
    "title": "",
    "name": "loginView",
    "description": "<p>Load login template with params</p>",
    "group": "account",
    "version": "0.1.0",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "200",
            "description": "<p>Params related with user { user : { &quot;logged&quot; : {Boolean}, &quot;username&quot; : {String}, &quot;first_name&quot; : {String}, &quot;last_name&quot; : {String}, &quot;groups&quot; : {String[]}, &quot;is_admin&quot; : {Boolean}, &quot;is_staff&quot; : {Boolean} } }</p>"
          }
        ]
      }
    },
    "filename": "./apps/account.js",
    "groupTitle": "account"
  },
  {
    "type": "post",
    "url": "/api/account/logout",
    "title": "Logout",
    "name": "logout",
    "description": "<p>Close session</p>",
    "group": "account",
    "version": "0.1.0",
    "success": {
      "examples": [
        {
          "title": "success-response:",
          "content": "HTTP/1.1 200 OK\n{\n    \"status\" : ok\n}",
          "type": "json"
        }
      ]
    },
    "filename": "./apps/account.js",
    "groupTitle": "account"
  }
] });