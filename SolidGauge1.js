(function() { 
    let template = document.createElement("template");
	  template.innerHTML = `
		    <div id="solidGaugeNew"></div>
	  `;
    
    let gLibLoaded = false;
    let perComp = 0;
    
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
           if(gLibLoaded == 0){
                          const script = document.createElement('script');
                          script.type = 'text/javascript';
                          script.async = true;
                          script.onload = function () {
                              gLibLoaded = true;
                              if(val!==''){
                                    am4core.ready(function(){
                                        am4core.useTheme(am4themes_animated);
                                         var chart = am4core.create("chartdiv", am4charts.SlicedChart);
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
                                        script.src = 'https://www.amcharts.com/lib/4/themes/animated.js';
                                        document.head.appendChild(script);
  
                                       script.src = 'https://www.amcharts.com/lib/4/charts.js';
                         	       document.head.appendChild(script);
                                       }
                                    }
                                
                                }
                          script.src = 'https://www.amcharts.com/lib/4/core.js';
                          document.head.appendChild(script);

                         
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
    customElements.define("com-demo-Gauge-chart", solidGaugeNew);
})();