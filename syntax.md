# general idea
- Recipe = (Channel->Event)->Data->(C.+Filter)->(Action<-Channel)
- Options for Channel, Event, C., Filter, Action, maybe even for data
- C. = Condition (?)
- Event delivers data
	- can be trigger or request
- C.+Filter processes data
	- C. emits true or false
	- Filters change data
- Actions do stuff with data
- Limiters slow triggers down (example: temperature sensor - fires every 1 seconds but should only send a message once a day)

# recipe
{
	"events":[
		{// create a rss feedsub stream
			"module": "rss",
			"type": "feedsub",
			"id": 0,
			"options": {
				"stuff": true
			},
			"slots": {// will pipe the title slot to slot 0 of the http/https filter
				"title": {
					"pipeTo": {
						"type": "filter",
						"id": 0,
						"slot": 0
					}
				}
			}
		},{
			"module": "time",
			"type": "current",
			"id": 1,
			"options": {
				"stuff": true
			}
		}
	],
	"actions":[
		{// create a growl notify action
			"module": "growl",
			"type": "notify",
			"id?": 0,
			"slots": [
				{
					"id": 0,
					"type": "title",
				},
				{
					"id": 1,
					"type": "text"
				}
			],
			"options": {
				"sticky": false,
				"priority": 0,
				"etc": true
			}
		}
	],
	"filters":[
		{// this will exchange every link from http to https
			"type": "replace",
			"value": ["http://","https://"],
			"pipeTo": {
				"type": "action",
				"id": 0,
				"slot": 1
			}
		}
	],
	"c":[
		{// allows every message containing "OMG" to trigger
			"type": "contains",
			"value": ["OMG"],
			"pipeTo": {
				"type": "action",
				"id": 0,
				"slot": 0,// 0 is default
			}
		},
		{// allows every message emitted at *:42:00-*:42:59 to trigger
			"type": "equals",
			"value": 42,
			"pipeTo": {
				"type": "action",
				"id": 0,
				"slot": 0
			}
		}
	]
}

# request
{
	"id":"requestingServer's id",
	"message":"encryptedMessage"
}

#message v0.1
{
	"from":"moduleName,id,whatever",
	"data":{
		
	}
}
#message v0.2
{
	"module": "moduleName",
	"event": "eventName",
	"data": {
		"stuff": true
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
