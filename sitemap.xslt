<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0" 
                xmlns:html="http://www.w3.org/TR/REC-html40"
                xmlns:sitemap="http://www.sitemaps.org/schemas/sitemap/0.9"
                xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
	<xsl:output method="html" version="1.0" encoding="UTF-8" indent="yes" />
	<xsl:template match="/">
		<html xmlns="http://www.w3.org/1999/xhtml">
			<head>
				<title>XML Sitemap</title>
				<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
				<meta name="robots" content="noindex,follow" />
				<style type="text/css">
					table {
                        font-family: arial, sans-serif;
                        border-collapse: collapse;
                    }
                    td, th {
                        text-align:left;
                        padding: 8px;
                    }
                    tr:nth-child(even) {
                        background-color: #F5F5F5;
                    }
				</style>
			</head>
			<body>
				<xsl:apply-templates></xsl:apply-templates>
			</body>
		</html>
	</xsl:template>
	
	
	<xsl:template match="sitemap:urlset">
        <h1>XML Sitemap</h1>
		<div id="content">
			<table>
				<tr>
					<th>URL</th>
					<th>Change frequency</th>
				</tr>
				<xsl:for-each select="./sitemap:url">
					<tr>
						<td>
							<xsl:variable name="url">
								<xsl:value-of select="sitemap:loc"/>
							</xsl:variable>
							<a href="{$url}">
								<xsl:value-of select="sitemap:loc"/>
							</a>
						</td>
						<td>
							<xsl:value-of select="sitemap:changefreq"/>
						</td>
					</tr>
				</xsl:for-each>
			</table>
		</div>
	</xsl:template>
</xsl:stylesheet>