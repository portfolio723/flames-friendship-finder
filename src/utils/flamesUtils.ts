
/**
 * FLAMES calculation utility functions
 * 
 * FLAMES stands for:
 * F - Friendship
 * L - Love
 * A - Affection
 * M - Marriage
 * E - Enemy
 * S - Siblings
 */

export type FlamesResult = 'Friendship' | 'Love' | 'Affection' | 'Marriage' | 'Enemy' | 'Siblings';

export interface FlamesResultDetails {
  type: FlamesResult;
  description: string;
  color: string;
}

/**
 * Calculate the FLAMES result based on two names
 */
export const calculateFlames = (name1: string, name2: string): FlamesResult => {
  if (!name1.trim() || !name2.trim()) {
    return 'Friendship'; // Default
  }

  // Remove spaces from names
  const cleanName1 = name1.toLowerCase().replace(/\s+/g, '');
  const cleanName2 = name2.toLowerCase().replace(/\s+/g, '');

  // Create arrays of characters for each name
  const chars1 = [...cleanName1];
  const chars2 = [...cleanName2];

  // Remove common characters from both names
  for (let i = 0; i < chars1.length; i++) {
    const char = chars1[i];
    const index = chars2.indexOf(char);
    
    if (index !== -1) {
      // Mark as processed with null
      chars1[i] = '';
      chars2[index] = '';
    }
  }

  // Count remaining characters
  const remainingCount = chars1.filter(char => char !== '').length + 
                         chars2.filter(char => char !== '').length;

  // If all characters cancelled out, return a default
  if (remainingCount === 0) {
    return 'Love';
  }

  // FLAMES algorithm
  const flames = ['Friendship', 'Love', 'Affection', 'Marriage', 'Enemy', 'Siblings'];
  
  let currentIndex = 0;
  let flamesArray = [...flames];

  while (flamesArray.length > 1) {
    // Calculate the index to remove (using modulo to handle wrap-around)
    currentIndex = (currentIndex + remainingCount - 1) % flamesArray.length;
    
    // Remove the letter at the current index
    flamesArray.splice(currentIndex, 1);
  }

  return flamesArray[0] as FlamesResult;
};

/**
 * Get details for a specific FLAMES result
 */
export const getFlamesDetails = (result: FlamesResult): FlamesResultDetails => {
  const details: Record<FlamesResult, FlamesResultDetails> = {
    Friendship: {
      type: 'Friendship',
      description: 'A wonderful bond of friendship exists between you two. Friendship is a connection that can last a lifetime.',
      color: 'flames-friendship'
    },
    Love: {
      type: 'Love',
      description: 'There is a strong romantic connection between you two. Love opens your heart to new possibilities.',
      color: 'flames-love'
    },
    Affection: {
      type: 'Affection',
      description: 'Deep affection flows between you. This kind of connection is built on genuine care and warmth.',
      color: 'flames-affection'
    },
    Marriage: {
      type: 'Marriage',
      description: 'Your relationship has the foundations for a strong, lasting partnership. Your connection has long-term potential.',
      color: 'flames-marriage'
    },
    Enemy: {
      type: 'Enemy',
      description: 'There may be challenging dynamics between you. Sometimes opposites can learn the most from each other.',
      color: 'flames-enemy'
    },
    Siblings: {
      type: 'Siblings',
      description: 'You share a sibling-like bond of comfort and familiarity. This connection brings both support and occasional rivalry.',
      color: 'flames-siblings'
    }
  };

  return details[result];
};
