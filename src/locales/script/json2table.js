const fs = require('fs');
const path = require('path');
const ExcelJS = require('exceljs');

// 读取 JSON 文件并解析
function readJSONFile(filename) {
	try {
		const data = fs.readFileSync(path.resolve(__dirname, '..', filename), 'utf8');
		return JSON.parse(data);
	} catch (err) {
		console.error(`Error reading JSON file ${filename}:`, err);
		return null;
	}
}

// 读取现有的 XLSX 文件，如果文件不存在，则创建一个新的
async function getOrCreateWorkbook(result) {
	return new Promise(async (resolve, reject) => {
		const filePath = path.resolve(__dirname, 'Multiple languages.xlsx');
		const workbook = new ExcelJS.Workbook();
		const outputFilePath = path.resolve(__dirname, 'Multiple languages.xlsx');

		if (fs.existsSync(filePath)) {
			// 如果文件存在，读取文件
			await workbook.xlsx.readFile(filePath);
			console.log('Workbook loaded');
			const worksheet = workbook.getWorksheet(1);
			updateXLSX(workbook, worksheet, outputFilePath, result);
		} else {
			const worksheet = workbook.addWorksheet('Sheet1');
			// 如果文件不存在，创建新的工作簿和工作表
			createWorkbookWithHeader(worksheet);
			console.log('Workbook created');
			addXLSX(workbook, worksheet, outputFilePath, result);
		}
		resolve(workbook);
	});
}

// 创建具有标题的工作表
function createWorkbookWithHeader(worksheet) {
	// 设置列宽
	worksheet.columns = [
		{ key: 'title', width: 80 },
		{ key: 'english', width: 80 },
		{ key: 'spanish', width: 80 },
		{ key: 'simplified-chinese', width: 80 },
		{ key: 'traditional-chinese', width: 80 },
		{ key: 'Korean', width: 80 },
		{ key: 'Japanese', width: 80 },
		{ key: 'Arabic', width: 80 },
	];

	// 设置表头样式
	const headerStyle = {
		font: { bold: true, color: { argb: 'FFFFFFFF' } },
		fill: { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF0000FF' } },
	};

	// 写入表头
	worksheet
		.addRow([
			'Title',
			'English',
			'Spanish',
			'Simplified Chinese',
			'Traditional Chinese',
			'Korean',
			'Japanese',
			'Arabic',
		])
		.eachCell((cell) => {
			cell.style = headerStyle;
		});
}

// 更新 XLSX 文件，保持第一行的样式并从下一行开始插入数据
async function addXLSX(workbook, worksheet, outputFilePath, data) {
	// 插入数据
	data.forEach((value, key) => {
		worksheet.addRow([key, ...Object.keys(value).map((key) => value[key])]);
	});

	await workbook.xlsx.writeFile(outputFilePath);
	console.log(`Add XLSX file at: ${outputFilePath}`);
}

// 更新 XLSX 文件，保持第一行的样式并从下一行开始插入数据
async function updateXLSX(workbook, worksheet, outputFilePath, data) {
	// 创建一个映射，以快速查找现有行
	const existingRowsMap = new Map();
	worksheet.eachRow((row, rowNumber) => {
		if (rowNumber > 1) {
			// 跳过标题行
			const titleCell = row.getCell(1).value; // 使用列索引
			existingRowsMap.set(titleCell, rowNumber);
		}
	});

	// 插入或更新数据
	data.forEach((value, key) => {
		if (!existingRowsMap.has(key)) {
			// 如果不存在相同的 title，则找到插入位置
			const keyInitial = key.charAt(0);
			let insertRowNumber = 0;

			// 找到与 key 首字母相同的最后一行
			for (let [title, rowNumber] of existingRowsMap) {
				const titleInitial = title.charAt(0);
				if (titleInitial === keyInitial && rowNumber >= insertRowNumber) {
					insertRowNumber = rowNumber + 1;
				}
			}

			console.log('insertNewRow', insertRowNumber, 'key', key);

			// 插入新行(如果找不到位置默认插入到最后一行)
			worksheet.insertRow(insertRowNumber || worksheet.rowCount + 1, [
				key,
				...Object.keys(value).map((key) => value[key]),
			]);

			// 更新 existingRowsMap 以包含新插入的行
			existingRowsMap.set(key, insertRowNumber);

			// 更新从insert位置开始到后面所有受影响的行号
			existingRowsMap.forEach((rowNum, title) => {
				if (rowNum >= insertRowNumber) {
					existingRowsMap.set(title, rowNum + 1);
				}
			});
		} else {
			// 如果存在相同的 title，则更新现有行
			const rowNumber = existingRowsMap.get(key);
			const row = worksheet.getRow(rowNumber);
			Object.keys(value).forEach((lang, index) => {
				row.getCell(index + 2).value = value[lang]; // 更新对应列的值，从第二列开始（第一列是标题）
			});
			row.commit(); // 提交更新
		}
	});

	await workbook.xlsx.writeFile(outputFilePath);
	console.log(`Updated XLSX file at: ${outputFilePath}`);
}

// 主函数
async function main() {
	let jsonResult = { en: {}, es: {}, zh: {}, tw: [], ko: [], ja: [], ar: [] };

	let hasEmpty = false;
	Object.keys(jsonResult).forEach((key) => {
		jsonResult[key] = readJSONFile(`${key}.json`) || '';
		if (!jsonResult[key]) {
			hasEmpty = true;
		}
	});

	if (hasEmpty) {
		console.error('Error reading JSON files.');
		return;
	}

	const result = new Map();

	// 合并 JSON 文件中的数据
	Object.keys(jsonResult.en).forEach((key) => {
		let data = {};
		Object.keys(jsonResult).forEach((lang) => {
			data[lang] = jsonResult[lang][key] || '';
		});
		result.set(key, data);
	});

	getOrCreateWorkbook(result);
}

main();
