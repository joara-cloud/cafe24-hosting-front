var path = require('path');

module.exports = { 
	outputDir: path.resolve(__dirname, "../backend/public"),
	devServer: { // 개발 서버 설정
		overlay: false,
		// proxy: { // proxyTable 설정 
		// 	'/api': { // 프록시 요청을 보낼 api의 시작 부분
		// 		target: 'http://localhost:3000/api',// 프록시 요청을 보낼 서버의 주소
		// 		changeOrigin: true , 
		// 		pathRewrite:{ 
		// 			"^/api" : '' 
		// 		}
		// 	} 
		// }
	} 
}