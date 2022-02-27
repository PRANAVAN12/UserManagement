import {
  DefaultFontStyles,
  FontSizes,
  getFocusStyle,
  getTheme,
  mergeStyleSets,
} from '@fluentui/react/lib/Styling';

const theme = getTheme();

export default mergeStyleSets({
  itemCell: [
    getFocusStyle(theme, -1),
    {
      display: 'flex',
      boxSizing: 'border-box',
      borderBottom: `1px solid ${theme.semanticColors.bodyDivider}`,
      selectors: {
        '&:hover': { background: theme.palette.neutralLight },
      },
    },
  ],
  itemImage: {
    flexShrink: 0,
  },
  itemContent: {
    marginLeft: 10,
    overflow: 'hidden',
    flexGrow: 1,
  },
  itemLink: {
    flex: 1,
    padding: 10,
    display: 'flex',
    overflow: 'hidden',
    verticalAlign: 'space-between',
    color: theme.palette.neutralDark,
    selectors: {
      '&:hover, &:active': {
        textDecoration: 'none !important',
        color: theme.palette.neutralDark,
      },
    },
  },
  itemName: [
    DefaultFontStyles.xLarge,
    {
      textOverflow: 'ellipsis',
    },
  ],
  itemIndex: {
    fontSize: FontSizes.small,
    color: theme.palette.neutralTertiary,
    marginBottom: 10,
  },
  chevron: {
    marginLeft: 10,
    alignSelf: 'center',
    flexShrink: 0,
    color: theme.palette.neutralTertiary,
    fontSize: FontSizes.large,
  },
});
