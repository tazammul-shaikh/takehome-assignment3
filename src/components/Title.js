import classes from './Title.module.css'

const Title = () => {
    return (
        <div className={classes.title}>
            <h3 className={classes.heading}>My PlayList</h3>
            <div className={classes.subheading}>List of music</div>
        </div>
    )
}

export default Title;