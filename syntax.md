# request
{
	"id":"requestingServer's id",
	"message":"encryptedMessage"
}

#message
{
	"from":"moduleName,id,whatever",
	"data":{
		
	}
}

#module
##general
{
	"name": "realName",
	"description": "This is not an exampleDescription.",
	"version": "0.0.1",
	"author": "dodekeract",
	"icon": "default is moduleFolder/icon.png",
	"events": {
		"see": "##events",
		"for": "more",
		"information": "!"
	},
	"action": {
		"see": "##actions",
		"for": "more",
		"information": "!"
	},
	"options": {
		"see": "##options",
		"for": "more",
		"information": "!"
	}
}
##events
{
	"internalName": {
		"name": "realName",
		"description": "This is not an exampleDescription.",
		"options": {
			"stuff": true
		},
		"data": {
			"exampleName":
		}
	},
	"internalName2": {
		"foo": "bar"
	}
}

##actions
{
	"internalName": {
		"name": "realName",
		"description": "This is not an exampleDescription.",
		"stuff": false
	}
}

##options
{
	"internalName": {
		"name": "realName",
		"description": "This is not an exampleDescription.",
		"stuff": false
	},
	"internalName2": {
		"name": "realName",
		"description": "This is not an exampleDescription.",
		"stuff": false
	}
}
##functions
addEvent();
removeEvent();