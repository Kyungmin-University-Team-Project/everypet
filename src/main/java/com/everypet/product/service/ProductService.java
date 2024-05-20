package com.everypet.product.service;


import com.everypet.product.data.dto.ProductDTO;

import java.io.IOException;

public interface ProductService {
    public void updateProductInfo(ProductDTO productDTO) throws IOException;
}
