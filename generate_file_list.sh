#!/bin/bash

# 生成 dfx.json 文件列表的脚本
# 使用方法: ./generate_file_list.sh

echo "生成文件列表..."

# 创建临时文件
TEMP_FILE=$(mktemp)

# 添加主要文件
echo "        \"App.vue\"," >> $TEMP_FILE
echo "        \"main.js\"," >> $TEMP_FILE
echo "        \"index.html\"," >> $TEMP_FILE
echo "        \"pages.json\"," >> $TEMP_FILE
echo "        \"manifest.json\"," >> $TEMP_FILE
echo "        \"uni.scss\"," >> $TEMP_FILE
echo "        \"package.json\"," >> $TEMP_FILE

# 添加 pages 目录下的文件
find pages -name "*.vue" -type f | sort | while read file; do
    echo "        \"$file\"," >> $TEMP_FILE
done

# 添加 static 目录下的文件
find static -type f | sort | while read file; do
    echo "        \"$file\"," >> $TEMP_FILE
done

# 显示生成的文件列表
echo "生成的文件列表："
cat $TEMP_FILE

echo ""
echo "请将上述内容复制到 dfx.json 的 source 数组中"
echo "注意：删除最后一个逗号"

# 清理临时文件
rm $TEMP_FILE 