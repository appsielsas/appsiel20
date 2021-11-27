/*<List
    sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
    component="nav"
>
    {dataLayout && dataLayout.aplication && dataLayout.aplication.map((item, i) => (
        <div key={i}>
            <ListItemButton onClick={handleClick} component={Link} to={item.url}>
                <ListItemIcon>
                    <i className={item.icon}></i>
                </ListItemIcon>
                <ListItemText primary={item.label} />
                {openCollapse ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse in={openCollapse} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                    {item.modulos.map((modul, i) => (
                        <div>
                            <ListItemButton sx={{ pl: 4 }} component={Link} to={modul.url} key={i}>
                                <ListItemIcon>
                                    <i className={modul.icon}></i>
                                </ListItemIcon>
                                <ListItemText primary={modul.label} />
                                {openCollapse ? <ExpandLess /> : <ExpandMore />}
                            </ListItemButton>

                            <Collapse in={openCollapse} timeout="auto" unmountOnExit>
                                <List component="div" disablePadding sx={{ pl: 2 }}>
                                    {modul.modelos.map((model, i) => (
                                        <ListItemButton sx={{ pl: 4 }} component={Link} to={model.url} key={i}>
                                            <ListItemIcon>
                                                <i className={model.icon}></i>
                                            </ListItemIcon>
                                            <ListItemText primary={model.label} />
                                        </ListItemButton>
                                    ))}
                                </List>
                            </Collapse>
                        </div>
                    ))}
                </List>
            </Collapse>
        </div>
    ))}


        [`& .${treeItemClasses.content}`]: {
            paddingLeft: theme.spacing(2)
        },
</List>*/