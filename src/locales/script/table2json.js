const ExcelJS = require('exceljs');
const fs = require('fs');
const path = require('path');

// 从 XLSX 文件中读取数据并转换为 JSON 格式
async function tableToJSON(filename) {
	try {
		const workbook = new ExcelJS.Workbook();
		await workbook.xlsx.readFile(path.resolve(__dirname, filename));
		const worksheet = workbook.worksheets[0]; // 假设数据在第一个工作表中
		const jsonResult = { en: {}, es: {}, zh: {}, tw: {}, ko: [], ja: [], ar: [] };

		// 遍历每一行数据，将每行的标题作为键，对应的翻译作为值
		worksheet.eachRow(function (row, rowNumber) {
			if (rowNumber > 1) {
				// 从第二行开始读取，因为第一行是标题
				const title = row.getCell(1).text; // 第一列是标题
				Object.keys(jsonResult).forEach((key, index) => {
					jsonResult[key][title] = row.getCell(2 + index).text || '';
				});
			}
		});

		return jsonResult;
	} catch (err) {
		console.error(`Error reading XLSX file ${filename}:`, err);
		return null;
	}
}

// 读取 JSON 文件并解析
function readJSONFile(filename) {
	return new Promise((resolve, reject) => {
		try {
			const data = fs.readFileSync(filename, 'utf8');
			resolve(JSON.parse(data));
		} catch (err) {
			console.error(`Error reading JSON file ${filename}:`, err);
			resolve({});
		}
	});
}

// 写入 JSON 数据到文件
function writeJSONToFile(data, language, outputDir) {
	const outputFilename = path.join(outputDir, `${language}.json`);
	try {
		fs.writeFileSync(outputFilename, JSON.stringify(data, null, 4), 'utf8');
		console.log(`JSON data for ${language} written to ${outputFilename}`);
	} catch (err) {
		console.error(`Error writing JSON data for ${language} to file ${outputFilename}:`, err);
	}
}

// 更新现有 JSON 数据
function updateJSONData(existingData, newData) {
	Object.keys(existingData).forEach((key) => {
		// 以线上数据为准，同时保证线下新增字段不被覆盖没
		existingData[key] = newData[key] || existingData[key] || '';
	});
	return existingData;
}

// 主函数
async function main() {
	const xlsxFile = 'Multiple languages.xlsx'; // 替换成你的表格文件路径
	const inputDir = path.join(__dirname, '../'); // 输入文件夹路径
	const outputDir = path.join(__dirname, '../'); // 输出文件夹路径

	// 创建输出文件夹
	if (!fs.existsSync(outputDir)) {
		fs.mkdirSync(outputDir);
	}

	const jsonData = await tableToJSON(xlsxFile);
	if (jsonData) {
		// 将数据写入各个语言的 JSON 文件
		Object.keys(jsonData).forEach(async (key) => {
			const inputFile = path.join(inputDir, `${key}.json`);
			let existingData = {};

			// 如果 input 文件夹中存在对应语言的 JSON 文件，就读取并更新
			if (fs.existsSync(inputFile)) {
				existingData = await readJSONFile(inputFile);
				existingData = updateJSONData(existingData, jsonData[key]);
			} else {
				// 如果不存在，就使用新的数据
				existingData = jsonData[key];
			}

			writeJSONToFile(existingData, key, outputDir);
		});
	} else {
		console.error('Error converting XLSX file to JSON.');
	}
}

main();
