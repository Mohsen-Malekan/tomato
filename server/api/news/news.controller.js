/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/news              ->  index
 * POST    /api/news              ->  create
 * GET     /api/news/:id          ->  show
 * PUT     /api/news/:id          ->  upsert
 * PATCH   /api/news/:id          ->  patch
 * DELETE  /api/news/:id          ->  destroy
 */

'use strict';

import jsonpatch from 'fast-json-patch';
import path from 'path';
import fs from 'fs';
import News from './news.model';
import _ from "lodash";

function respondWithResult (res, statusCode) {
  statusCode = statusCode || 200;
  return function (entity) {
    if (entity) {
      return res.status(statusCode).json(entity);
    }
    return null;
  };
}

function patchUpdates (patches) {
  return function (entity) {
    try {
      // eslint-disable-next-line prefer-reflect
      jsonpatch.apply(entity, patches, /*validate*/ true);
    }
    catch (err) {
      return Promise.reject(err);
    }

    return entity.save();
  };
}

function removeEntity (res) {
  return function (entity) {
    if (entity) {
      return entity.remove()
        .then(() => {
          res.status(204).end();
        });
    }
  };
}

function handleEntityNotFound (res) {
  return function (entity) {
    if (!entity) {
      res.status(404).end();
      return null;
    }
    return entity;
  };
}

function handleError (res, statusCode) {
  statusCode = statusCode || 500;
  return function (err) {
    res.status(statusCode).send(err);
  };
}

// Gets a list of Newss
export function index (req, res) {
  return News.find().exec()
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Gets a list of Newss
export function lates3 (req, res) {
  return News.find().sort({date2 : -1}).limit(3).exec()
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Gets a single News from the DB
export function show (req, res) {
  return News.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Creates a new News in the DB
export function create (req, res) {
  req.body.date2 = new Date();
  return News.create(req.body)
    .then(function (news) {
      let file = req.file;
      if (!file) {
        return news;
      }
      let tempPath   = file.path;
      let targetPath = path.join(__dirname, '../../../client/assets/images/news', `${news._id}.jpg`);
      news.url       = `assets/images/news/${news._id}.jpg`;
      fs.rename(tempPath, targetPath, err => {
        if (err) console.log('news:rename> ', err);
        fs.unlink(tempPath, err => {
          if (err) console.log('news:unlink> ', err);
        });
      });
      return news.save();
    })
    .then(respondWithResult(res, 201))
    .catch(handleError(res));
}

// Upserts the given News in the DB at the specified ID
export function upsert (req, res) {
  if (req.body._id) {
    Reflect.deleteProperty(req.body, '_id');
  }
  return News.findOneAndUpdate({_id : req.params.id}, req.body, {
    new                 : true,
    upsert              : true,
    setDefaultsOnInsert : true,
    runValidators       : true
  }).exec()

    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Updates an existing News in the DB
export function patch (req, res) {
  if (req.body._id) {
    Reflect.deleteProperty(req.body, '_id');
  }
  return News.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(patchUpdates(req.body))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Deletes a News from the DB
export function destroy (req, res) {
  return News.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(res => {
      let targetPath = path.join(__dirname, '../../../client/assets/images/news', `${res._id}.jpg`);
      if (fs.existsSync(targetPath)) {
        fs.unlink(targetPath, err => {
          if (err) console.error(err);
        });
      }
      return res;
    })
    .then(removeEntity(res))
    .catch(handleError(res));
}
