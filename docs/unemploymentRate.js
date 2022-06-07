(function () {
    var myConnector = tableau.makeConnector();
 
   myConnector.getSchema = function (schemaCallback) {
    
	var cols = [
        { id : "REGION", alias : "Region", dataType : tableau.dataTypeEnum.string },
        { id : "UNIT", alias : "Unit of Measure", dataType : tableau.dataTypeEnum.string },
        { id : "MEASURE", alias : "Measure", dataType : tableau.dataTypeEnum.string },
        { id : "FREQUENCY", alias : "Frequency", dataType : tableau.dataTypeEnum.string },
        { id : "TSEST", alias : "Adjustment Type", dataType : tableau.dataTypeEnum.string },
        { id : "TIME_PERIOD", alias : "Time", dataType : tableau.dataTypeEnum.string },
        { id : "obs", alias : "observation", dataType : tableau.dataTypeEnum.float }
    ];

    var tableInfo = {
        id : "LF",
        alias : "Unemployment Rate, Australia, 1978 to Current",
        columns : cols
    };


schemaCallback([tableInfo]);

	
	
	
    
};
 
    myConnector.getData = function (table, doneCallback) {
    var tableData = [],
        REGION = "",
        UNIT = "",
        MEASURE = "",
        FREQUENCY = "",
        TSEST = "",
        TIME_PERIOD = "",
        obs = 0;

    	$.getJSON("https://api.data.abs.gov.au/data/ABS,LF,1.0.0/M1+M2+M3+M4+M5+M6+M9+M12+M14+M15+M16+M13.3.1599.20+30.AUS.M", function (resp) {
        var obsvs = resp.dataSets[0].observations; 


        for (var i = 0, len = Object.keys(obsvs).length; i < len; i++) {
			
			
			var arrKey = Object.keys(obsvs)[i].split(':')
			
            REGION = resp.structure.dimensions.observation[0].values[arrKey[0]].name;
            UNIT = resp.structure.dimensions.observation[1].values[arrKey[1]].name;
            MEASURE = resp.structure.dimensions.observation[2].values[arrKey[2]].name;
            FREQUENCY = resp.structure.dimensions.observation[3].values[arrKey[3]].name;
            TSEST = resp.structure.dimensions.observation[4].values[arrKey[4]].name;
            TIME_PERIOD = resp.structure.dimensions.observation[5].values[arrKey[5]].name;
            obs = obsvs[Object.keys(obsvs)[i]][0]; 

            tableData.push({
                "REGION" : REGION,
                "UNIT" : UNIT,
                "MEASURE" : MEASURE,
                "FREQUENCY" : FREQUENCY,
                "TSEST" : TSEST,
                "TIME_PERIOD" : TIME_PERIOD,
                "obs" : obs
            });
			
			
			
        }

        table.appendRows(tableData);

        doneCallback();
    });
};
    tableau.registerConnector(myConnector);
	
	$(document).ready(function () {
    $("#submitButton").click(function () {
        tableau.connectionName = "Australia: ABS Unemployment Rate";
        tableau.submit();
    });
});
	
})();
