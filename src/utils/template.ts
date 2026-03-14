import { readFile } from "fs/promises";
import { join, dirname } from "path";
import { fileURLToPath } from "url";
import Handlebars from "handlebars";

const __dirname = dirname(fileURLToPath(import.meta.url));
const TEMPLATES_DIR = join(__dirname, "..", "templates");

// 注册常用 Handlebars helpers
Handlebars.registerHelper("upper", (str: string) => str?.toUpperCase());
Handlebars.registerHelper("lower", (str: string) => str?.toLowerCase());
Handlebars.registerHelper("json", (value: unknown) => JSON.stringify(value, null, 2));

/**
 * 从 templates 目录加载并编译 Handlebars 模板
 * @param templateName 模板文件名（不含 .hbs 后缀）
 * @param context 模板渲染上下文
 */
export async function renderTemplate(templateName: string, context: Record<string, unknown>): Promise<string> {
  const templatePath = join(TEMPLATES_DIR, `${templateName}.hbs`);
  const source = await readFile(templatePath, "utf-8");
  const template = Handlebars.compile(source);
  return template(context);
}
