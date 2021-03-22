import { Body, Controller, Get, Param, Post, HttpStatus, Request, Res, Req, Headers  } from '@nestjs/common';
import { Url } from 'src/models/url.model';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Response } from 'express';

@Controller()
export class UrlController {
  
    constructor (
        @InjectRepository(Url)
        private urlRepo : Repository<Url>
    ){ }


    @Get('/')
    get(): string {
      return "Wiser Educação - API Challenge encurtador";
    }


    @Post('encurtador')
    encurtador(@Body() body : Url,  @Res() res: Response, @Req() req : Request, @Headers() headers) {

        const urlData = new Url();
        urlData.url = body.url;

        const minutes = 30;
        const date = new Date(); 
        const expire = new Date(date.getTime() - date.getTimezoneOffset()*60*1000);
        expire.setMinutes( expire.getMinutes() + minutes);
        urlData.expire = expire;

        urlData.short = this.shortURL();

        // URL utilizada
        const  fullUrl = 'http://' + headers.host + '/' + urlData.short;

        const url = this.urlRepo.create(urlData);
        this.urlRepo.save(url);

        res.status(HttpStatus.OK).json({"newURL" : fullUrl});
    }

    @Get(":url")
    public async show(@Param('url') url : string,  @Res() res: Response)  {
        const result = this.urlRepo.createQueryBuilder("url")
        .where("url.short = :url", {url : url})
        .getOne();        
        const getUrl = (await result).url;
        if (result)
            res.redirect("http://" + getUrl);
        else
            res.status(404).send("HTTP 404");
    }


    shortURL() {
        var     uuid = require('uuid-random');
        const   min  = 5; // Mínimo 
        const   max  = 10; // Máximo
        let     num  = Math.floor(Math.random() * (max - min)) + min;
        return uuid().replace(/-/g, '').substring(0,num);
    }
  
}
