define({ "api": [
  {
    "type": "post",
    "url": "/api/xapi/statements",
    "title": "InsertStatement",
    "name": "InsertStatement",
    "description": "<p>Insert statement as xapi</p>",
    "group": "XAPI",
    "version": "0.1.0",
    "success": {
      "examples": [
        {
          "title": "success-response",
          "content": "HTTP/1.1 200 OK\n{\n     status : \"ok\",\n     message : {String},\n     bookmark_success : {Object[]},\n     bookmark_failed : {Object[]}\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "StatementMissing",
          "content": "HTTP/1.1 400 ERROR\n{\n    \"status\" : \"failed\",\n    \"message\" : {String},\n    \"error\" : {String}\n}",
          "type": "json"
        },
        {
          "title": "ServerError",
          "content": "HTTP/1.1 500 ERROR\n{\n    \"status\" : \"error\",\n    \"message\" : {String}\n}",
          "type": "json"
        }
      ]
    },
    "filename": "./apps/xapi.js",
    "groupTitle": "XAPI"
  },
  {
    "type": "get",
    "url": "/api/xapi/statements/",
    "title": "get_statements",
    "name": "getStatements",
    "description": "<p>Get statements saved by user</p>",
    "group": "XAPI",
    "version": "0.1.0",
    "success": {
      "examples": [
        {
          "title": "200 Get statements by user",
          "content": "{\n     status : \"ok\",\n     statements : {Object[]} \n}",
          "type": "Object[]"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "400 AuthenticationFailed",
          "content": "{\n     \"status\": \"failed\",\n     \"message\": \"User is not authenticated\"\n }",
          "type": "JSON"
        }
      ]
    },
    "filename": "./apps/xapi.js",
    "groupTitle": "XAPI"
  },
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
    "url": "/api/account/is_authenticated/",
    "title": "is_authenticated",
    "name": "isAuthenticated",
    "description": "<p>return logged status in session</p>",
    "group": "account",
    "success": {
      "examples": [
        {
          "title": "Success-response",
          "content": "HTTP/1.1 200 OK\n{\n    \"logged\" : {Boolean}\n}",
          "type": "JSON"
        }
      ]
    },
    "version": "0.0.0",
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
          "content": "HTTP/1.1 400 ERROR\n{\n    \"status\" : \"failed\",\n    \"message\" : \"username and/or passowrd are incorrect\"\n\n}",
          "type": "Object"
        },
        {
          "title": "ServerError",
          "content": "HTTP/1.1 500 ERROR\n{\n    \"status\" : \"error\",\n    \"message\" : \"Server Error - check endpoint server\"\n}",
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
