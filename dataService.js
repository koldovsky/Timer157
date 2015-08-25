(function (root, service) {   
  // Browser globals (root is window)
     root.DataService = service(); 
  
}(this, function () {
  
	var DataService = {},
      		
	  	storage=null;    
  
	var serialize = function(value) {
		return JSON.stringify(value)
	};
	var deserialize = function(value) {
		if (typeof value != 'string') { 
      return undefined; 
    }
		try { 
      return JSON.parse(value) 
    }
		catch(e) { return value || undefined };
	}

	function isLocalStorageNameSupported() {
		try { 
      return ('localStorage' in window && window['localStorage']) 
    }
		catch(err) { 
      return false; 
    }
	};

	if (isLocalStorageNameSupported()) {
		storage = window['localStorage'];
		DataService.set = function(key, val) {
			if (val === undefined) { 
        return DataService.remove(key); 
      }
			storage.setItem(key, serialize.call(this, val))
			return val;
		};
		DataService.get = function(key, defaultVal) {
			var val = deserialize.call(this, storage.getItem(key));
			return (val === undefined ? defaultVal : val);
		};
		DataService.remove = function(key) { 
      storage.removeItem(key); 
    };
		DataService.clear = function() { 
      storage.clear();
    };
		DataService.getAll = function() {
			var retrive = {};
			 forEach.call(this, function(key, val) {
				retrive[key] = val;
			})
			return retrive;
		};
    
		var forEach = function(callback) {
			for (var i=0, storgLn = storage.length; i<storgLn; i++) {
				var key = storage.key(i);
				callback(key, DataService.get(key));
			}
		}
	}
	try {
		var testKey = '__DataServicejs__'
		DataService.set(testKey, testKey)
		if (DataService.get(testKey) != testKey) { 
      DataService.disabled = true; 
    }
		DataService.remove(testKey);
	} catch(e) {
	  	DataService.disabled = true;
	}
	DataService.enabled = !DataService.disabled;
	
	return DataService;
}));
