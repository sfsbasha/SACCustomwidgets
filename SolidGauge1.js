(function() { 
    let template = document.createElement("template");
	  template.innerHTML = `
                    <style>
                      #SolidGaugediv{
  			width: 100%;
  			height: 100%;
                    </style>
		    <div id="SolidGaugediv"></div>
	  `;
    
    let solidLibLoaded = 0;
    
    class solidGaugeNew extends HTMLElement {
		    constructor() {
			      super(); 
			      let shadowRoot = this.attachShadow({mode: "open"});
			      shadowRoot.appendChild(template.content.cloneNode(true));
			
			      this.addEventListener("click", event => {
				        var event = new Event("onClick");
				        this.dispatchEvent(event);
			      });
			      this._props = {};
		    }
	    
        render(val) {
             var perComp = 0;
             var selValuePlaceholder = document.querySelector(".sapCustomWidgetWebComponent").shadowRoot.querySelector("#selectedBar");
             if(selValuePlaceholder && selValuePlaceholder.innerText && selValuePlaceholder.innerText !=''){
		perComp = Number(selValuePlaceholder.innerText);
	        }
             var rows = val.split(",");
	     var rowIndex = 0;	    
	     for(rowIndex=0;rowIndex<rows.length;rowIndex++){
		perComp = perComp+Number(rows[rowIndex]);
	      }
 	    if(rows.length !== 0){
	       perComp = Math.round(perComp/rows.length);
	    }
            
            if(solidLibLoaded === 0){
              const script = document.createElement('script');
              script.type = 'text/javascript';
              script.async = true;
              script.onload = function (){
               const chartscript = document.createElement('script');
               chartscript.type = 'text/javascript';
               chartscript.async = true;
               chartscript.onload = function () {
                     const chartanmscript = document.createElement('script');
                     chartanmscript.type = 'text/javascript';
                     chartanmscript.async = true;
                     chartanmscript.onload = function () {
                      solidLibLoaded = 1;
                      am4core.ready(function() {
                       am4core.useTheme(am4themes_animated);
                       const amChartGauge = document.querySelector("#__widget2").querySelector(".sapCustomWidgetWebComponent").shadowRoot.querySelector("SolidGaugediv");
                       var chart = am4core.create(SolidGaugediv, am4charts.SlicedChart);
                       chart.hiddenState.properties.opacity = 0;
                       chart.data = [{
   			 "name": "The first",
   			 "value": 600
			}, {
   			 "name": "The second",
   			 "value": 300
			}, {
 		         "name": "The third",
		          "value": 200
			}, {
		        "name": "The fourth",
		        "value": 180
			}, {
		       "name": "The fifth",
                       "value": 50
			}, {
		       "name": "The sixth",
		       "value": 20
			}, {
		       "name": "The seventh",
                       "value": 10
                       }];
                        var series = chart.series.push(new am4charts.FunnelSeries());
                        series.colors.step = 2;
			series.dataFields.value = "value";
			series.dataFields.category = "name";
			series.alignLabels = true;
			series.orientation = "horizontal";
			series.bottomRatio = 1;

			chart.legend = new am4charts.Legend();
			chart.legend.position = "top";
                      });
                     }
                        chartanmscript.src = 'https://www.amcharts.com/lib/4/themes/animated.js';
    		    	//Append it to the document header
    		    	document.head.appendChild(chartanmscript);
                }
                chartscript.src = 'https://www.amcharts.com/lib/4/charts.js';
    		    //Append it to the document header
    		    document.head.appendChild(chartscript); 
              }
               script.src = 'https://www.amcharts.com/lib/4/core.js';
    		//Append it to the document header
    		document.head.appendChild(script);
             }
            }

        onCustomWidgetBeforeUpdate(changedProperties) {
            this._props = { ...this._props, ...changedProperties };
        }

        onCustomWidgetAfterUpdate(changedProperties) {
            if ("value" in changedProperties) {
                this.$value = changedProperties["value"];
            }
	    this.render(this.$value);
	    this.$percentdone = perComp;	
        }
    }
    customElements.define("com-demo-Gauge-chart", SolidGaugeNew);
})();