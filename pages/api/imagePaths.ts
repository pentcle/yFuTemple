import fs from 'fs';
import path from 'path';

import type {NextApiRequest, NextApiResponse} from 'next';

// Function to get all image paths in a folder
const getImagePaths = (folderPath: string): string[] => {
	const fullPath = path.join(process.cwd(), 'public', folderPath);

	// Check if the folder exists
	if (!fs.existsSync(fullPath)) {
		throw new Error(`Folder not found: ${fullPath}`);
	}

	// Read all files in the folder
	const fileNames = fs.readdirSync(fullPath);
	// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
	return fileNames.map((fileName) => path.join(folderPath, fileName));
};

// API handler with proper error handling
export default function handler(req: NextApiRequest, res: NextApiResponse): void {
	const {folder} = req.query;

	// Validate the folder parameter
	if (typeof folder !== 'string') {
		res.status(400).json({error: 'Invalid folder path'});
		return;
	}

	try {
		// Attempt to get the image paths
		const imagePaths = getImagePaths(folder);
		res.status(200).json({imagePaths});
	} catch (error) {
		// Log the error for debugging
		console.error('Error retrieving image paths:', error);

		// Handle errors based on their type
		if (error instanceof Error) {
			res.status(500).json({error: error.message});
		} else {
			res.status(500).json({error: 'An unknown error occurred'});
		}
	}
}
