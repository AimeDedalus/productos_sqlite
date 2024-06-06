const Product = require('../models/productModel');

exports.getIndex = (req, res) => {
    res.render('index');
};

exports.getAddProduct = (req, res) => {
    res.render('add');
};

exports.postAddProduct = async (req, res) => {
    const { codigo, nombre, categoria, stock, stockmin, precio } = req.body;
    try {
        const existingProduct = await Product.findOne({ where: { codigo } });
        if (existingProduct) {
            return res.render('add', { error: 'El código ya existe. Por favor, use un código diferente.' });
        }

        await Product.create({ codigo, nombre, categoria, stock, stockmin, precio });
        res.redirect('/');
    } catch (error) {
        console.error(error);
        res.redirect('/add');
    }
};

exports.getSearchProduct = (req, res) => {
    res.render('search');
};

exports.postSearchProduct = async (req, res) => {
    const { codigo } = req.body;
    try {
        const product = await Product.findOne({ where: { codigo } });
        res.render('modify', { product });
    } catch (error) {
        console.error(error);
        res.redirect('/search');
    }
};

exports.getModifySearch = (req, res) => {
    res.render('modifySearch');
};

exports.postModifySearch = async (req, res) => {
    const { codigo } = req.body;
    try {
        const product = await Product.findOne({ where: { codigo } });
        res.render('modify', { product });
    } catch (error) {
        console.error(error);
        res.redirect('/modifySearch');
    }
};

exports.postModifyProduct = async (req, res) => {
    const { id, nombre, categoria, stock, stockmin, precio } = req.body;
    try {
        await Product.update({ nombre, categoria, stock, stockmin, precio }, { where: { id } });
        res.redirect('/');
    } catch (error) {
        console.error(error);
        res.redirect('/modifySearch');
    }
};

exports.getDeleteProduct = (req, res) => {
    res.render('delete');
};

exports.postDeleteProduct = async (req, res) => {
    const { codigo } = req.body;
    try {
        const product = await Product.findOne({ where: { codigo } });
        if (product) {
            res.render('deleteConfirm', { product });
        } else {
            res.redirect('/delete');
        }
    } catch (error) {
        console.error(error);
        res.redirect('/delete');
    }
};

exports.postDeleteConfirm = async (req, res) => {
    const { id } = req.body;
    try {
        await Product.destroy({ where: { id } });
        res.redirect('/');
    } catch (error) {
        console.error(error);
        res.redirect('/delete');
    }
};

exports.getShowAllProducts = async (req, res) => {
    try {
        const products = await Product.findAll();
        res.render('showAll', { products });
    } catch (error) {
        console.error(error);
        res.redirect('/');
    }
};
