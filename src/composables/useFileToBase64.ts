/**
 * Summary: Composable function to convert a file to a base64-encoded string
 * @copyright Copyright (c) 2024 CentrSeal. All rights reserved.
 * @file This file defines the useFileToBase64 composable function for file conversion to base64 encoding.
 * @author Kasra Jannati
 */

export const useFileToBase64 = () => {
  /**
   * Converts a given file to a base64-encoded string.
   * @param {File} file - The file to be converted to base64.
   * @returns {Promise<string>} - A promise that resolves to the base64-encoded string.
   */
  const convertToBase64 = async (file: File): Promise<string> => {
    return await new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        resolve(reader.result as string);
      };
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };

  return { convertToBase64 };
};
