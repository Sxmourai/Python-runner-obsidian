import {
	App,
	Plugin,
	PluginSettingTab,
	Setting,
} from "obsidian";

interface PluginSettings {
	code: string;
}
import "fs";
import { exec } from "child_process";
import { readFile, writeFile } from "fs";

export default class MyPlugin extends Plugin {
	settings: PluginSettings;

	async onload() {
		await this.loadSettings();
		this.addSettingTab(new MainSettingTab(this.app, this));
		this.exec(`python "${this.get_local_path()}/main.py"`);
	}

	get_local_path(): string {
		return `${
			(this.app.vault.adapter as any).basePath
		}/.obsidian/plugins/obsidian-python-runner/`;
	}

	exec(command: string): string {
		exec(command, (error, stdout, stderr) => {
			if (error) {
				console.log(`error: ${error.message}`);
				throw new Error();
			}
			if (stderr) {
				console.log(`stderr: ${stderr}`);
				throw new Error();
			}
			return stdout;
		});
		throw new Error();
	}

	onunload() {}
	async loadSettings() {
		this.settings = Object.assign(
			{},
			{ code: this.get_code() },
			await this.loadData()
		);
	}

	get_code(): string {
		readFile(`${this.get_local_path()}/user.py`, (err, data) => {
			if (err) {
				console.error(err)
			} else {
				return data
			}
		})
		throw new Error
	}

	set_code() {
		writeFile(
			`${this.get_local_path()}/user.py`,
			this.settings.code,
			(err) => {
				if (err) {
					console.error(err);
				}
			}
		);
	}

	async saveSettings() {
		await this.saveData(this.settings);
	}
}

export class MainSettingTab extends PluginSettingTab {
	plugin: MyPlugin;

	constructor(app: App, plugin: MyPlugin) {
		super(app, plugin);
		this.plugin = plugin;
	}

	display(): void {
		this.containerEl.empty();

		new Setting(this.containerEl)
			.setName("Functions")
			.setDesc(
				"The functions to be called by different ways... You only need to define them... The plugin automatically checks for your created functions and lets you call them."
			)
			.addText((text) =>
				text
					.setPlaceholder(
						'def example(str):\n    print(f"hi {str} !")'
					)
					.setValue(this.plugin.settings.code)
					.onChange(async (value) => {
						this.plugin.settings.code = value;
						await this.plugin.saveSettings();
					})
			);
	}
}
