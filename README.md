pnpm link --global

pnpm link --global @xxx

打包失败，出现错误 Error: Command failed with exit code 1: pnpm install
解决方法： 不通过命令交互，而是通过 root 的 packages -r 递归进行 pnpm install
