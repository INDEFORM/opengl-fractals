#!/bin/sh
#	"libs/iconselect/iscroll.js"
#	"libs/iconselect/control/iconselect.js"

COMPILER_PATH=~/development/web/_utils/jscompiler/compiler.jar
IN_FILES=(
	"charmd/core.js"
	"charmd/view3d.js"
	"charmd/scene.js"
	"charmd/cwidget.js"
	"charmd/charm.js"
	"charmd/charm-background.js"
	"charmd/element.js"
	"charmd/element-engravable.js"
	"charmd/charmlette-element.js"
	"charmd/text-element-svg.js"
	"charmd/ui.js"
	"charmd/image-element.js"
	"shaders/improved-phong.js"
	"charmd/charm-material.js"
	)
INOUT_PATH=""
OUT_FILE="charmlet.min.js"

#------

compile_list=""

for i in "${IN_FILES[@]}"
	do
		compile_list="$compile_list --js=$INOUT_PATH$i"
	done


java -jar $COMPILER_PATH --jscomp_off=internetExplorerChecks --language_in=ECMASCRIPT5 $compile_list --js_output_file=$INOUT_PATH$OUT_FILE
