
const ConditionalLink = ({ link, className, children, ...props}) => {  
  
  return(
    link 
    ?
      <a href={link} className={className} {...props} >
        {children}
      </a>
    : 
      <div className={className}>{children}</div>
  )
}

export default ConditionalLink;