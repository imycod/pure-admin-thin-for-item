1. Exported Figma Variables go inside the 'Input' Directory
2. Then run the Convert Scripts
3. Which will take the Figma Variable Files Data and Convert it to data we can use in Tailwind.config.js


1. To Export Figma Variables

	Need to have someone with 'Edit Access' to the Figma File ( Designer ) run the following Addon: ( Variables Import Export - by Magic Grass ) 	https://www.figma.com/community/plugin/1254848311152928301/variables-import-export
	This normally allows you to download the Figma Variable File as one file but since we have multiple we have to split them up manually
	So I'm expecting to end up with these 3 files ( ignoring Spacing Variables for now, just Color Variables ):

	a. Input/_Core Colors.value.tokens.json
	b. Input/Mode.Light.tokens.json
	c. Input/Mode.Dark.tokens.json

2. Split Script into multiple files

	python figma_dump_splitter.py

3. Run the 3 Convert Scripts

	inside the Figma_Variables Folder run the following 3 commands in order:

	node convert1.js && node convert2.js && node convert3.js
	node convert1.js; node convert2.js; node convert3.js

	The output should be:
	File written successfully: C:\...\figma_variables\output1.json   // Colors  ( like "gray": { 50: "#F6F6F6", ... } )
	File written successfully: C:\...\figma_variables\output2.json   // Tailwind Class Names ( like "filled-rest": "var( --unis-primary-1)", )
	File written successfully: C:\...\figma_variables\output3.json   // CSS Dark/Light Variables ( like "--black": "#FFFFFF", ... "#000000", )


Note:

	 --unis-primary-1,  --unis-primary-2,  --unis-primary-3 are the most complex and all theme colors are not stored in Figma Variables.
	So the Offset Values of these is different for different Theme Color which is what is captured in:
	a. Figma: "The Design System" > Foundations -> Theme Rulebook -> Guildelines: Primary Themes + Secondary Themes + Grayscale Themes
	b. Google Sheets: "UNIS Color" https://docs.google.com/spreadsheets/d/1sHmwzTArVeZqadAGGjqBElcLSxBrGUnR7QOsHE11cPw/edit?usp=sharing
	c. File: theme_color_offsets.json

