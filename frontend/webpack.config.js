// const path = require("path");
const HtmlPlugin = require('html-webpack-plugin');

module.exports = {
	// 파일을 읽어들이는 진입점 설정
	entry: './src/js/index.js',

	// 결과물 반환 옵션
	output: {
		// 기본은 path dist, filename main.js
		// path: path.resolve(__dirname, "dist"),
		filename: 'index.js',
		clean: true,
		// 기존 빌드 결과 제거
	},

	module: {
		rules: [
			{
				test: /\.css$/,
				use: ['style-loader', 'css-loader'],
				// 순서 중요, 뒤에서부터 로드
			},
			{
				test: /\.js$/,
				use: ['babel-loader'],
			},
			{
				test: /\.html$/,
				use: ['html-loader'],
			},
		],
	},

	// 번들링 후 결과물의 처리 방식
	plugins: [
		new HtmlPlugin({
			template: './index.html',
		}),
	],
};
