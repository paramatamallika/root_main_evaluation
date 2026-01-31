module.exports = (role) => {
  return (req, res, next) => {
    const userRole = req.headers.role
    const userId = req.headers.userid

    if (!userRole || !userId) {
      return res.status(401).json({ message: 'Role or User ID missing in headers' })
    }

    if (userRole !== role) {
      return res.status(403).json({ message: 'Access denied' })
    }

    req.user = { id: userId, role: userRole }
    next()
  }
}
