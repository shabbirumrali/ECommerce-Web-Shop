import { makeStyles } from "@material-ui/core";

export default makeStyles(() => ({
    root: {
        maxWidth: '100%',
        margin: '10px'
      },
      media: {
        height: 0,
        paddingTop: '56.25%', // 16:9
      },
      cardActions: {
        display: 'flex',
        justifyContent: 'flex-end',
      },
      cardContent: {
        display: 'flex',
        justifyContent: 'space-between',
      },
}))