
// A map of table ids to their instance columns (or _id if we couldn't pull it)
var display_cols = {"Tea_houses_editable": "Name", "imnci": "_id", "sign": "_id", "household_member": "name", "follow_arrival": "_id", "femaleClients": "_id", "complex_validate_test": "_id", "maleClients": "_id", "eonasdan": "_id", "section_test": "_id", "gridScreen": "_id", "geotagger_default_location": "_id", "large_dataset": "object_name", "testRun": "test", "follow_map_position": "_id", "customAppearance": "_id", "refrigerators": "_id", "agriculture": "plot_name", "food_bout": "_id", "exampleForm": "_id", "farm_field": "field_uuid", "household": "household_id", "Ethiopia_members": "name", "breathcounter": "_id", "Tea_types": "Name", "geoweather": "Description_Date", "child_coverage": "_id", "plot": "plot_name", "other_species": "_id", "mating_event": "_id", "farms": "farm_uuid", "follow": "_id", "send_sms": "_id", "Tea_inventory": "_id", "follow_map_time": "_id", "scan_example": "_id", "geopoints": "_id", "adult_coverage": "_id", "farm_crop": "crop_name", "sms_example": "_id", "selects_demo": "_id", "graphExample": "_id", "selects": "_id", "visit": "_id", "groom_bout": "_id", "geoweather_conditions": "Description", "datatypes": "_id", "twoColumn": "_id", "Ethiopia_household": "household_id", "Tea_houses": "Name", "geotagger": "_id", "imgci": "_id"}
// List of tables to edit with formgen. If a table isn't found in this list, we edit it with survey instead
var allowed_tables = ["Tea_houses_editable", "household_member", "follow_arrival", "femaleClients", "complex_validate_test", "maleClients", "eonasdan", "section_test", "gridScreen", "geotagger_default_location", "large_dataset", "testRun", "follow_map_position", "customAppearance", "refrigerators", "food_bout", "exampleForm", "farm_field", "household", "Ethiopia_members", "Tea_types", "geoweather", "child_coverage", "plot", "other_species", "mating_event", "farms", "follow", "Tea_inventory", "follow_map_time", "geopoints", "adult_coverage", "farm_crop", "selects_demo", "graphExample", "selects", "groom_bout", "geoweather_conditions", "datatypes", "twoColumn", "Ethiopia_household", "Tea_houses", "geotagger"];
var customJsOl = function customJsOl() {
		var br = function(col, extra) {
		return function(e, c, d) { return "<b>" + col + "</b>: " + c + (extra ? extra : "<br />"); };
	}
	var check = function(col, accepting, type) {
		if (accepting === undefined) {
			accepting = function(e, c, d) {
				return c.toUpperCase() == "YES";
			}
		}
		if (type === undefined) type = "checkbox"
		return function(e, c, d) {
			return "<input disabled type='"+type+"' " + (accepting(e, c, d) ? "checked=checked" : "") + " /><b>" + col + "</b>";
		};
	}
	var selected = function(a, b) {
		if (a == null) return false;
		if (a[0] == "[") {
			return jsonParse(a).indexOf(b) >= 0;
		}
		return a.toUpperCase() == b.toUpperCase();
	}

	main_col = "thName";
	table_id = "Tea_houses";
	global_join = "Tea_types ON Tea_types._id = Tea_houses.Specialty_Type_id"
	global_which_cols_to_select = "*, Tea_types.Name AS ttName, Tea_houses.Name AS thName, (SELECT COUNT(*) FROM Tea_inventory WHERE Tea_inventory.House_id = Tea_houses._id) AS num_teas"
	var opened = function(e, c, d) { return "<b>Opened</b>: " + (c == null ? "" : c).split("T")[0]; };
	colmap = [
		["thName", function(e, c, d) { return c }],
		["State", true],
		["Region", true],
		["District", true],
		["Neighborhood", br("Neighborhood")],
		["ttName", br("Specialty")],
		["Date_Opened", opened],
		["Customers", "Number of Customers: "],
		["Visits", br("Total Number of Visits")],
		["Location_latitude", "Latitude (GPS): "],
		["Location_longitude", br("Longitude (GPS)", "<br /><br /><b>Services</b>:")],
		["Iced", check("Iced")],
		["Hot", check("Hot")],
		["WiFi", function(e, c, d) { return check("WiFi")(e, c, d) + "<br /><h3>Contact Information</h3>"; }],
		["Store_Owner", true],
		["Phone_Number", "Mobile number: "],
		["num_teas", function (e, c, d) {
			odkTables.setSubListView("Tea_inventory", "House_id = ?", [row_id], "config/assets/Tea_inventory_list.html#Tea_inventory/thName = ?/" + d.getData(0, "thName"));
			return "<span onClick='openTeas();' style='color: blue; text-decoration: underline;'>" + c + " tea" + (c.toString() == 1 ? "" : "s") + "</span>";
		}],
	]
	colmap = [
		{"column": "thName", "callback": function(e, c, d) { return c; }},
		{"column": "State"},
		{"column": "Region"},
		{"column": "District"},
		{"column": "Neighborhood", "callback": br("Neighborhood")},
		{"column": "ttName", "callback": br("Specialty")},
		{"column": "Date_Opened", "callback": opened},
		{"column": "Customers", "display_name": "Number of Customers: "},
		{"column": "Visits", "callback": br("Total Number of Visits")},
		{"column": "Location_latitude", "display_name": "Latitude (GPS): "},
		{"column": "Location_longitude", "callback": br("Longitude (GPS)", "<br /><br /><b>Services</b>:")},
		{"column": "Iced", "callback": check("Iced")},
		{"column": "Hot", "callback": check("Hot")},
		{"column": "WiFi", "callback": function(e, c, d) { return check("WiFi")(e, c, d) + "<br /><h3>Contact Information</h3>"; }},
		{"column": "Store_Owner"},
		{"column": "Phone_Number", "display_name": "Mobile number: "},
		{"column": "num_teas", "callback": function(e, c, d) {
			odkTables.setSubListView("Tea_inventory", "House_id = ?", [row_id], "config/assets/Tea_inventory_list.html#Tea_inventory/thName = ?/" + d.getData(0, "thName"));
			return "<span onClick='openTeas();' style='color: blue; text-decoration: underline;'>" + c + " tea" + (c.toString() == 1 ? "" : "s") + "</span>";
		}}
	]
	window.openTeas = function openTeas() {
		odkTables.openTableToListView({}, "Tea_inventory", "House_id = ?", [row_id], "config/assets/Tea_inventory_list.html#Tea_inventory/thName = ?/" + cached_d.getData(0, "thName"));
	}

}
