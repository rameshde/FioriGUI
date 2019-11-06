ace.define("ace/mode/lua_highlight_rules",["require","exports","module","ace/lib/oop","ace/mode/text_highlight_rules"],function(r,e,m){"use strict";var o=r("../lib/oop");var T=r("./text_highlight_rules").TextHighlightRules;var L=function(){var k=("break|do|else|elseif|end|for|function|if|in|local|repeat|"+"return|then|until|while|or|and|not");var b=("true|false|nil|_G|_VERSION");var f=("string|xpcall|package|tostring|print|os|unpack|require|"+"getfenv|setmetatable|next|assert|tonumber|io|rawequal|"+"collectgarbage|getmetatable|module|rawset|math|debug|"+"pcall|table|newproxy|type|coroutine|_G|select|gcinfo|"+"pairs|rawget|loadstring|ipairs|_VERSION|dofile|setfenv|"+"load|error|loadfile|"+"sub|upper|len|gfind|rep|find|match|char|dump|gmatch|"+"reverse|byte|format|gsub|lower|preload|loadlib|loaded|"+"loaders|cpath|config|path|seeall|exit|setlocale|date|"+"getenv|difftime|remove|time|clock|tmpname|rename|execute|"+"lines|write|close|flush|open|output|type|read|stderr|"+"stdin|input|stdout|popen|tmpfile|log|max|acos|huge|"+"ldexp|pi|cos|tanh|pow|deg|tan|cosh|sinh|random|randomseed|"+"frexp|ceil|floor|rad|abs|sqrt|modf|asin|min|mod|fmod|log10|"+"atan2|exp|sin|atan|getupvalue|debug|sethook|getmetatable|"+"gethook|setmetatable|setlocal|traceback|setfenv|getinfo|"+"setupvalue|getlocal|getregistry|getfenv|setn|insert|getn|"+"foreachi|maxn|foreach|concat|sort|remove|resume|yield|"+"status|wrap|create|running|"+"__add|__sub|__mod|__unm|__concat|__lt|__index|__call|__gc|__metatable|"+"__mul|__div|__pow|__len|__eq|__le|__newindex|__tostring|__mode|__tonumber");var s=("string|package|os|io|math|debug|table|coroutine");var d=("setn|foreach|foreachi|gcinfo|log10|maxn");var a=this.createKeywordMapper({"keyword":k,"support.function":f,"keyword.deprecated":d,"constant.library":s,"constant.language":b,"variable.language":"self"},"identifier");var c="(?:(?:[1-9]\\d*)|(?:0))";var h="(?:0[xX][\\dA-Fa-f]+)";var i="(?:"+c+"|"+h+")";var g="(?:\\.\\d+)";var j="(?:\\d+)";var p="(?:(?:"+j+"?"+g+")|(?:"+j+"\\.))";var l="(?:"+p+")";this.$rules={"start":[{stateName:"bracketedComment",onMatch:function(v,n,q){q.unshift(this.next,v.length-2,n);return"comment";},regex:/\-\-\[=*\[/,next:[{onMatch:function(v,n,q){if(v.length==q[1]){q.shift();q.shift();this.next=q.shift();}else{this.next="";}return"comment";},regex:/\]=*\]/,next:"start"},{defaultToken:"comment"}]},{token:"comment",regex:"\\-\\-.*$"},{stateName:"bracketedString",onMatch:function(v,n,q){q.unshift(this.next,v.length,n);return"string.start";},regex:/\[=*\[/,next:[{onMatch:function(v,n,q){if(v.length==q[1]){q.shift();q.shift();this.next=q.shift();}else{this.next="";}return"string.end";},regex:/\]=*\]/,next:"start"},{defaultToken:"string"}]},{token:"string",regex:'"(?:[^\\\\]|\\\\.)*?"'},{token:"string",regex:"'(?:[^\\\\]|\\\\.)*?'"},{token:"constant.numeric",regex:l},{token:"constant.numeric",regex:i+"\\b"},{token:a,regex:"[a-zA-Z_$][a-zA-Z0-9_$]*\\b"},{token:"keyword.operator",regex:"\\+|\\-|\\*|\\/|%|\\#|\\^|~|<|>|<=|=>|==|~=|=|\\:|\\.\\.\\.|\\.\\."},{token:"paren.lparen",regex:"[\\[\\(\\{]"},{token:"paren.rparen",regex:"[\\]\\)\\}]"},{token:"text",regex:"\\s+|\\w+"}]};this.normalizeRules();};o.inherits(L,T);e.LuaHighlightRules=L;});ace.define("ace/mode/folding/lua",["require","exports","module","ace/lib/oop","ace/mode/folding/fold_mode","ace/range","ace/token_iterator"],function(r,e,m){"use strict";var o=r("../../lib/oop");var B=r("./fold_mode").FoldMode;var R=r("../../range").Range;var T=r("../../token_iterator").TokenIterator;var F=e.FoldMode=function(){};o.inherits(F,B);(function(){this.foldingStartMarker=/\b(function|then|do|repeat)\b|{\s*$|(\[=*\[)/;this.foldingStopMarker=/\bend\b|^\s*}|\]=*\]/;this.getFoldWidget=function(s,f,a){var l=s.getLine(a);var i=this.foldingStartMarker.test(l);var b=this.foldingStopMarker.test(l);if(i&&!b){var c=l.match(this.foldingStartMarker);if(c[1]=="then"&&/\belseif\b/.test(l))return;if(c[1]){if(s.getTokenAt(a,c.index+1).type==="keyword")return"start";}else if(c[2]){var t=s.bgTokenizer.getState(a)||"";if(t[0]=="bracketedComment"||t[0]=="bracketedString")return"start";}else{return"start";}}if(f!="markbeginend"||!b||i&&b)return"";var c=l.match(this.foldingStopMarker);if(c[0]==="end"){if(s.getTokenAt(a,c.index+1).type==="keyword")return"end";}else if(c[0][0]==="]"){var t=s.bgTokenizer.getState(a-1)||"";if(t[0]=="bracketedComment"||t[0]=="bracketedString")return"end";}else return"end";};this.getFoldWidgetRange=function(s,f,a){var l=s.doc.getLine(a);var b=this.foldingStartMarker.exec(l);if(b){if(b[1])return this.luaBlock(s,a,b.index+1);if(b[2])return s.getCommentFoldRange(a,b.index+1);return this.openingBracketBlock(s,"{",a,b.index);}var b=this.foldingStopMarker.exec(l);if(b){if(b[0]==="end"){if(s.getTokenAt(a,b.index+1).type==="keyword")return this.luaBlock(s,a,b.index+1);}if(b[0][0]==="]")return s.getCommentFoldRange(a,b.index+1);return this.closingBracketBlock(s,"}",a,b.index+b[0].length);}};this.luaBlock=function(s,a,c,t){var b=new T(s,a,c);var i={"function":1,"do":1,"then":1,"elseif":-1,"end":-1,"repeat":1,"until":-1};var d=b.getCurrentToken();if(!d||d.type!="keyword")return;var v=d.value;var f=[v];var g=i[v];if(!g)return;var h=g===-1?b.getCurrentTokenColumn():s.getLine(a).length;var j=a;b.step=g===-1?b.stepBackward:b.stepForward;while(d=b.step()){if(d.type!=="keyword")continue;var l=g*i[d.value];if(l>0){f.unshift(d.value);}else if(l<=0){f.shift();if(!f.length&&d.value!="elseif")break;if(l===0)f.unshift(d.value);}}if(!d)return null;if(t)return b.getCurrentTokenRange();var a=b.getCurrentTokenRow();if(g===-1)return new R(a,s.getLine(a).length,j,h);else return new R(j,h,a,b.getCurrentTokenColumn());};}).call(F.prototype);});ace.define("ace/mode/lua",["require","exports","module","ace/lib/oop","ace/mode/text","ace/mode/lua_highlight_rules","ace/mode/folding/lua","ace/range","ace/worker/worker_client"],function(r,a,m){"use strict";var o=r("../lib/oop");var T=r("./text").Mode;var L=r("./lua_highlight_rules").LuaHighlightRules;var b=r("./folding/lua").FoldMode;var R=r("../range").Range;var W=r("../worker/worker_client").WorkerClient;var M=function(){this.HighlightRules=L;this.foldingRules=new b();this.$behaviour=this.$defaultBehaviour;};o.inherits(M,T);(function(){this.lineCommentStart="--";this.blockComment={start:"--[",end:"]--"};var c={"function":1,"then":1,"do":1,"else":1,"elseif":1,"repeat":1,"end":-1,"until":-1};var d=["else","elseif","end","until"];function g(t){var l=0;for(var i=0;i<t.length;i++){var e=t[i];if(e.type=="keyword"){if(e.value in c){l+=c[e.value];}}else if(e.type=="paren.lparen"){l+=e.value.length;}else if(e.type=="paren.rparen"){l-=e.value.length;}}if(l<0){return-1;}else if(l>0){return 1;}else{return 0;}}this.getNextLineIndent=function(s,l,t){var i=this.$getIndent(l);var e=0;var f=this.getTokenizer().getLineTokens(l,s);var h=f.tokens;if(s=="start"){e=g(h);}if(e>0){return i+t;}else if(e<0&&i.substr(i.length-t.length)==t){if(!this.checkOutdent(s,l,"\n")){return i.substr(0,i.length-t.length);}}return i;};this.checkOutdent=function(s,l,i){if(i!="\n"&&i!="\r"&&i!="\r\n")return false;if(l.match(/^\s*[\)\}\]]$/))return true;var t=this.getTokenizer().getLineTokens(l.trim(),s).tokens;if(!t||!t.length)return false;return(t[0].type=="keyword"&&d.indexOf(t[0].value)!=-1);};this.getMatching=function(s,e,f){if(e==undefined){var p=s.selection.lead;f=p.column;e=p.row;}var h=s.getTokenAt(e,f);if(h&&h.value in c)return this.foldingRules.luaBlock(s,e,f,true);};this.autoOutdent=function(s,e,f){var l=e.getLine(f);var h=l.match(/^\s*/)[0].length;if(!h||!f)return;var i=this.getMatching(e,f,h+1);if(!i||i.start.row==f)return;var j=this.$getIndent(e.getLine(i.start.row));if(j.length!=h){e.replace(new R(f,0,f,h),j);e.outdentRows(new R(f+1,0,f+1,0));}};this.createWorker=function(s){var w=new W(["ace"],"ace/mode/lua_worker","Worker");w.attachToDocument(s.getDocument());w.on("annotate",function(e){s.setAnnotations(e.data);});w.on("terminate",function(){s.clearAnnotations();});return w;};this.$id="ace/mode/lua";}).call(M.prototype);a.Mode=M;});(function(){ace.require(["ace/mode/lua"],function(m){if(typeof module=="object"&&typeof exports=="object"&&module){module.exports=m;}});})();
