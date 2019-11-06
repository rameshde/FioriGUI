/**
 * @license hyphenEngine.asm.js 2.4.0-devel - client side hyphenation for webbrowsers
 * ©2018  Mathias Nater, Zürich (mathiasnater at gmail dot com)
 * https://github.com/mnater/Hyphenopoly
 *
 * Released under the MIT license
 * http://mnater.github.io/Hyphenopoly/LICENSE
 */
function asmHyphenEngine(s,e,a){"use asm";var u=new s.Uint8Array(a);var b=new s.Uint16Array(a);var c=new s.Int32Array(a);var d=s.Math.imul;var f=e.hpbTranslateOffset|0;var g=e.hpbPatternsOffset|0;var p=e.patternsLength|0;var v=e.valueStoreOffset|0;var j=e.patternTrieOffset|0;var w=e.wordOffset|0;var t=e.translatedWordOffset|0;var l=e.hyphenPointsOffset|0;var m=e.hyphenatedWordOffset|0;var n=0;var o=0;function q(i){i=i|0;var h=0;h=d(i,40503);h=(h>>8)+1&255;return h<<1;}function r(h,i){h=h|0;i=i|0;var k=0;k=q(h|0)|0;while((b[k>>1]|0)!=0){k=(k+2)|0;}b[k>>1]=h;u[((k>>1)+512)|0]=i;}function x(h){h=h|0;var i=0;if((h|0)==0){return 255;}i=q(h)|0;while((b[i>>1]|0)!=(h|0)){i=(i+2)|0;if((i|0)>=512){return 255;}}return u[((i>>1)+512)|0]|0;}function y(){var i=0;var k=0;var h=0;var C=0;var D=0;i=(f+2)|0;k=12|0;n=b[f>>1]<<1;while((i|0)<(g|0)){h=b[i>>1]|0;C=b[(i+2)>>1]|0;D=x(C)|0;if((D|0)==255){r(h,k);if((C|0)!=0){r(C,k);}k=(k+1)|0;}else{r(h,D);}b[(768+(o<<1))>>1]=h;o=(o+1)|0;i=(i+4)|0;}}function z(h){h=h|0;var i=0;i=x(h|0)|0;if((i|0)==255){return 255;}return(i-12)<<3;}function A(){var i=0;var h=0;var k=0;var C=0;var D=0;var E=0;var F=0;var G=0;var H=0;var I=0;var J=0;var K=0;var L=0;var M=0;K=(v+1)|0;L=(v+1)|0;M=(v+1)|0;y();i=g|0;h=g+p|0;while((i|0)<(h|0)){k=u[i|0]|0;if((k|0)==58){C=!C;}else{if((C|0)==1){D=k|0;}else{E=(E+1)|0;if((k|0)>11){if((F|0)==0){L=(L+1)|0;}F=0;if((G|0)==-1){H=(H+(((n+1)|0)<<2))|0;G=H;c[(j+I+J)>>2]=G;}J=((k-12)|0)<<3;I=G;G=c[(j+I+J)>>2]|0;if((G|0)==0){c[(j+I+J)>>2]=-1;G=-1;}}else{u[L|0]=k|0;M=L;L=(L+1)|0;F=1;}if((E|0)==(D|0)){u[(M+1)|0]=255;c[(j+I+J+4)>>2]=(K-v)|0;K=(M+2)|0;L=K;E=0;I=0;G=0;F=0;}}}i=(i+1)|0;}}function B(h,i){h=h|0;i=i|0;var k=0;var C=0;var D=0;var E=0;var F=0;var G=0;var H=0;var I=0;var J=0;var K=0;var L=0;var M=0;var N=0;C=(u[w|0]<<1)|0;F=(w+2)|0;while((D|0)<(C|0)){N=z(b[(F+D)>>1]|0)|0;if((N|0)==255){M=1;break;}b[(t+D)>>1]=N|0;D=(D+2)|0;}while((L|0)<((C+1)|0)){u[(l+L)|0]=0;L=(L+1)|0;}if((M|0)==1){return 0;}L=0;while((k|0)<(C|0)){E=0;D=k|0;while((D|0)<(C|0)){G=b[(t+D)>>1]|0;H=c[(j+E+G)>>2]|0;I=c[(j+E+G+4)>>2]|0;if((I|0)>0){J=0;K=u[(v+I)|0]|0;while((K|0)!=255){L=(l+(k>>1)+J)|0;if((K|0)>(u[L|0]|0)){u[L|0]=K|0;}J=(J+1)|0;K=u[(v+I+J)|0]|0;}}if((H|0)>0){E=H|0;}else{break;}D=(D+2)|0;}k=(k+2)|0;}D=0;J=0;while((D|0)<=(C|0)){b[(m+D+J)>>1]=b[(F+D)>>1]|0;if((D>>1)>=(h|0)){if((D>>1)<=(((C>>1)-i-2)|0)){if(u[(l+(D>>1)+1)|0]&1==1){b[(m+D+J+2)>>1]=173;J=(J+2)|0}}}D=(D+2)|0;}b[m>>1]=((C>>1)+(J>>1)-2)|0;return 1;}return{convert:A,hyphenate:B};}
