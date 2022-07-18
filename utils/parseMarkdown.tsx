export function	parseMarkdown(markdownText: string): string {
	const htmlText = markdownText
		.replace(/\[(.*?)\]\((.*?)\)/gim, "<a class='underline cursor-pointer text-yblue font-bold' target='_blank' href='$2'>$1</a>")
		.replace(/~~(.*?)~~/gim, "<span class='text-yblue'>$1</span>")
		.replace(/\*\*(.*?)\*\*/gim, "<span class='font-bold'>$1</span>")
		;

	return htmlText.trim();
}