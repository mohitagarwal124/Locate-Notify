!function(e,r){"object"==typeof exports?module.exports=r():e.moment.parseFormat=r()}(this,function(){function e(e,d){var n=e;return d=d||{},d.preferredOrder=d.preferredOrder||U,n=n.replace(C,"x"),n=n.replace(P,"X"),n=n.replace(N,"[$1]"),n=n.replace(Y,"dddd"),n=n.replace(o,"ddd"),n=n.replace(s,"dd"),n=n.replace(D,"Do"),n=n.replace(m,"MMMM"),n=n.replace(u,"MMM"),n=n.replace(h,r.bind(null,d)),n=n.replace(g,"Z"),n=n.replace(H,"HH:mm:ss.SSS"),n=n.replace(j,"hh:mm:ss$1"),n=n.replace(R,"h:mm:ss$1"),n=n.replace(w,"hh:mm$1"),n=n.replace(S,"h:mm$1"),n=n.replace(E,"hh$1"),n=n.replace(O,"h$1"),n=n.replace($,"HH:mm:ss"),n=n.replace(F,"H:mm:ss"),n=n.replace(A,"HH:mm"),n=n.replace(J,"H:mm"),b.test(e)?n+="A":y.test(e)&&(n+="a"),n=n.replace(T,"YYYY"),n=n.replace(v,"DD"),n=n.replace(I,"D"),n=n.replace(W,"YY")}function r(e,r,d,n,a,p){var t,i=1===Math.min(d.length,a.length,p.length),l=4===Math.max(d.length,a.length,p.length),M="string"==typeof e.preferredOrder?e.preferredOrder:e.preferredOrder[n];return d=parseInt(d,10),a=parseInt(a,10),p=parseInt(p,10),t=[d,a,p],M=M.toUpperCase(),d>31?(t[0]=l?"YYYY":"YY",t[1]=i?"M":"MM",t[2]=i?"D":"DD",t.join(n)):a>12?(t[0]=i?"M":"MM",t[1]=i?"D":"DD",t[2]=l?"YYYY":"YY",t.join(n)):p>31?(t[2]=l?"YYYY":"YY","M"===M[0]?(t[0]=i?"M":"MM",t[1]=i?"D":"DD",t.join(n)):(t[0]=i?"D":"DD",t[1]=i?"M":"MM",t.join(n))):(t[M.indexOf("D")]=i?"D":"DD",t[M.indexOf("M")]=i?"M":"MM",t[M.indexOf("Y")]=l?"YYYY":"YY",t.join(n))}var d=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],n=["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],a=["Su","Mo","Tu","We","Th","Fr","Sa"],p=["January","February","March","April","May","June","July","August","September","October","November","December"],t=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],i="AM",l="PM",M="am",c="pm",Y=new RegExp(d.join("|"),"i"),o=new RegExp(n.join("|"),"i"),s=new RegExp("\\b("+a.join("|")+")\\b","i"),m=new RegExp(p.join("|"),"i"),u=new RegExp(t.join("|"),"i"),D=/(\d+)(st|nd|rd|th)\b/i,h=/(\d{1,4})([\/\.\-])(\d{1,2})[\/\.\-](\d{1,4})/,g=/((\+|\-)\d\d:\d\d)$/,x="("+[i,l].join("|")+")",f="("+[M,c].join("|")+")",y=new RegExp(f),b=new RegExp(x),j=new RegExp("0\\d\\:\\d{1,2}\\:\\d{1,2}(\\s*)"+x,"i"),w=new RegExp("0\\d\\:\\d{1,2}(\\s*)"+x,"i"),E=new RegExp("0\\d(\\s*)"+x,"i"),R=new RegExp("\\d{1,2}\\:\\d{1,2}\\:\\d{1,2}(\\s*)"+x,"i"),S=new RegExp("\\d{1,2}\\:\\d{1,2}(\\s*)"+x,"i"),O=new RegExp("\\d{1,2}(\\s*)"+x,"i"),H=/\d{2}:\d{2}:\d{2}\.\d{3}/,$=/0\d:\d{2}:\d{2}/,A=/0\d:\d{2}/,F=/\d{1,2}:\d{2}:\d{2}/,J=/\d{1,2}:\d{2}/,T=/\d{4}/,v=/0\d/,I=/\d{1,2}/,W=/\d{2}/,N=/\b(at)\b/i,C=/\d{13}/,P=/\d{10}/,U={"/":"MDY",".":"DMY","-":"YMD"};return e});