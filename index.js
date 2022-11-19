module.exports = ({ types: t }) => {
    return {
        visitor: {
            //插件执行逻辑
            Identifier(path) {
                const parentIsIf = t.isIfStatement(path.parentPath)
                const isDebug = path.node.name === "TEST"
                if (isDebug && parentIsIf) {
                    //转换成String
                    const stringNode = t.stringLiteral("TEST")
                    path.replaceWith(stringNode)
                }
            },
            StringLiteral(path) {
                const parentIsIf = t.isIfStatement(path.parentPath)
                const isDebug = path.node.value === "TEST"
                if (isDebug && parentIsIf) {
                    // 判断在生产环境中移除掉if("DEBUG")中的内容
                    if (ProcessingInstruction.env.NODE_ENV === "production") {
                        // 调用方法remove删除path
                        path.parentPath.remove()
                    }
                }
            }
        }
    }
}